const List = require('../models/list')

exports.getLists = (req, res) => {
  const lists = List.find({board: req.board._id})
  res.status(200).json(lists);
};

exports.postList = (req, res) => {
  let list = new List({
    name: req.body.name,
    cards: [],
    board: req.board._id
  })
  req.board.lists.push(list)
  req.board.lists.save()
  res.status(200).send(list)
}