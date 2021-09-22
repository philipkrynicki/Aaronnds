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
  Card.findById(req.params.card)
    .populate("comments")
    .exec((err, card) => {
      if (!card) res.sendStatus(404);
      if (err) throw err;
      res.status(200).json(card);
    })
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
  List.findById(req.params.list)
    .exec((err, list) => {
    list.cards.push(newCard);
    list.save();

    newCard.save((err, card) => {
      if (err) {
        next(err)
      }
      res.status(200).json(card);
    })
    })
}