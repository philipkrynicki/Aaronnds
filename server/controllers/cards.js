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
  Card.deleteOne({_id: req.params.card})
    .exec((err, card) => {
      if (err) next(err)
      res.status(200).send("Card deleted")
    })
}

exports.updateCard = (req, res) => {
  const update = req.body;

  Card.findOneAndUpdate({_id: req.params.card}, update, { new: true })
    .exec((err, updatedCard) => {
      if (err) next(err)
      res.status(200).json(updatedCard)
    })
}