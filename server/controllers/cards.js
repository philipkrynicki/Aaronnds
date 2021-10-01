const Card = require('../models/card');
const List = require('../models/list');

// Get all cards for a list
exports.getCards = (req, res) => {

  Card
  .find({list: req.params.list})
  .exec((err, cards) => {
    if (err) throw err;
    res.status(200).json(cards)
  })
}

exports.getCard = (req, res) => {
  res.status(200).json(req.card);
}

exports.postCard = (req, res) => {
  if (!req.body.name) {
    res.status(400).send("No name included in request")
    return res.end();
  } 

  let newCard = new Card({
    name: req.body.name,
    description: req.body.description || null,
    activities: [],
    labels: [],
    comments: [],
    list: req.params.list
  })

  req.list.cards.push(newCard);
  req.list.save();

  newCard.save((err, card) => {
    if (err) next(err)

    req.app.get('io').emit('newCard', card);
    res.status(200).json(card);
  })  
}

// Move a card across lists
exports.moveCard = (req, res) => {
  const originListId = req.list._id;
  const cardId = req.card._id;
  const destinationListId = req.body.destinationList;

  if (!destinationListId) {
    res.status(400).send('destinationList required in request body')
    return res.end();
  }

 List.findById(destinationListId)
 .exec((err, destinationList) => {
    // Make sure the destination list is in the db
    if (!destinationList) {
      res.status(404).send('Destination list not found');
    } else if (err) {
      throw err;

    } else {
      
      // Remove the card from the origin list
      List.updateOne({_id: originListId}, {'$pull': {'cards': cardId}})
      .exec((err, card) => {
        if (err) next(err)

        if (card.modifiedCount) {
          // Add the card to the destination list
          destinationList.cards.push(cardId);
          destinationList.save();

          // Update the card's list reference
          Card.updateOne({_id: cardId}, {list: destinationList._id})
          .exec(err => {
            if (err) throw err;
            
            // Send the card id, origin list id, and updated destination list
            res.status(200).send({
              card: req.card._id,
              originList: req.list._id,
              updatedList: destinationList
            });
          })
        } else {
          // Return 404 if the specified card wasn't part of the origin list
          res.status(404).send('Card not in list');
        }   
      })
    }
 });
}

exports.deleteCard = (req, res) => {
  Card.deleteOne({_id: req.card._id})
  .then(() => {

    List.updateOne({_id: req.card.list}, {'$pull': {'cards': req.card._id}})
    .exec(err => {
      if (err) next(err)
      res.status(200).send(req.card._id)
    })
  })
}

exports.updateCard = (req, res) => {
  // if (!req.body.name || !req.body.description ||!req.body.list) 
  if (!req.body)
  {
    res.status(400).send("No update information included in request body")
    return res.end();
  } 

  const update = req.body;

  Card.findOneAndUpdate({_id: req.card._id}, update, { new: true })
    .exec((err, updatedCard) => {
      if (err) next(err)
      res.status(200).json(updatedCard)
    })
}