const List = require('../models/list')

exports.getLists = (req, res) => {
  List.find({board: req.board._id})
  .exec((err, lists) => {
    res.status(200).json(lists);
  })
};

exports.postList = (req, res) => {
  let newList = new List({
    name: req.body.name,
    cards: [],
    board: req.board._id
  })
  req.board.lists.push(newList)
  req.board.save()
  newList.save()
  res.status(200).send(newList)
}