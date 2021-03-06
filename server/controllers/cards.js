const Card = require('../models/card');
const List = require('../models/list');

// Get all cards for a list
exports.getCards = (req, res) => {
  Card
  .find({list: req.params.list})
  .sort({position: 1})
  .exec((err, cards) => {
    if (err) throw err;
    res.status(200).json(cards)
  })
}

exports.getCard = (req, res) => {
  res.status(200).json(req.card);
}

exports.postCard = (req, res) => {
  const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short'});

  const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  const creationDate = "Card created -- " + today + ", " + now;

  if (!req.body.name) {
    res.status(400).send("No name included in request")
    return res.end();
  } 

  let newCard = new Card({
    name: req.body.name,
    description: req.body.description || null,
    activities: [creationDate],
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
          Card.findOneAndUpdate({_id: cardId}, {list: destinationList._id}, {new: true})
          .exec((err, card) => {
            if (err) throw err;
            
            // Set the card's position to last in the new list
            card.setNext('card_position_seq', (err, card) => {
              if (err) throw err;

              // Send the card id, origin list id, and updated destination list
              req.app.get('io').emit('moveCard', req.list.board);

              res.status(200).send({
                card: card._id,
                originList: req.list,
                updatedList: destinationList
              });
            })
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
      
      const deleteData = {
        card: req.card._id,
        list: req.card.list
      }

      req.app.get('io').emit('deleteCard', deleteData);
      res.status(200).send(deleteData)
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
           
      req.app.get('io').emit('updateCard', {
        updatedCard: updatedCard,
        board: req.card.list.board
      });

      res.status(200).json(updatedCard)
    })
}

// Change a card's position in a List, similar to moveList
exports.updateCardPosition = (req, res) => {
  const newPosition = parseInt(req.body.newPosition);
  const oldPosition = req.card.position;

  if (!newPosition) {
    res.status(400).send("newPosition required in request body")
    return res.end();
  }

  Card.findOneAndUpdate({_id: req.card._id}, {position: newPosition}, {new: true})
  .exec((err, movedCard) => {
    if (err) throw err;

    if (newPosition < oldPosition) {
      Card.find({list: movedCard.list, position: {$gte: newPosition, $lt: oldPosition}, _id: {$ne: movedCard._id}})
      .exec((err, cards) => {
        if (err) throw err;

        cards.forEach(card => {
          card.position += 1;
          card.save();
        })

      })

    } else if (newPosition > oldPosition) {
      Card.find({list: movedCard.list, position: {$lte: newPosition, $gt: oldPosition}, _id: {$ne: movedCard._id}})
      .exec((err, cards) => {
        if (err) throw err;

        cards.forEach(card => {
          card.position -= 1;
          card.save();
        })        
      })
    }

    req.app.get('io').emit('moveCard', movedCard.list.board);
    res.status(200).json(movedCard);
    
  })
}