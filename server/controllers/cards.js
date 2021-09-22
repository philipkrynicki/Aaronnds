const Card = require('../models/card');

// Get all cards for a list
exports.getCards = (req, res) => {
  

  Card
  .find({list: req.params.list})
  .exec((err, cards) => {
    if (err) throw err;
    res.status(200).json(cards)
  })
}