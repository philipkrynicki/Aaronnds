const Card = require('../models/card');
const List = require('../models/list');

// Get all cards for a list
exports.getCards = (req, res) => {
  //figure out how to get invalid list id to stop crashing server

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
    description: req.body.description,
    activities: [],
    labels: [],
    comments: [],
    list: req.params.list
  })

  req.list.cards.push(newCard);
  req.list.save();

  newCard.save((err, card) => {
    if (err) next(err)
    res.status(200).json(card);
  })
}

exports.deleteCard = (req, res) => {
  Card.deleteOne({_id: req.card._id})
  .then(() => {

    List.updateOne({_id: req.card.list}, {'$pull': {'cards': req.card._id}})
    .exec((err, card) => {
      if (err) next(err)
      res.status(200).send(req.card._id)
    })
  })
}

exports.updateCard = (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).send("No update information included in request body")
    return res.end();
  } 
  const update = req.body;

  Card.findOneAndUpdate({_id: req.params.card}, update, { new: true })
    .exec((err, updatedCard) => {
      if (err) next(err)
      res.status(200).json(updatedCard)
    })
}