const List = require('../models/list')
const Board = require('../models/board');

const ListModel = List.ListModel;

exports.getLists = (req, res) => {
  ListModel.find({board: req.board._id})
  .populate('cards')
  .exec((err, lists) => {
    res.status(200).json(lists);
  })
};

exports.postList = (req, res) => {
  if (!req.body.name) {
    res.status(400).send("No list name included in request")
    return res.end();
  } 

  let newList = new ListModel({
    name: req.body.name,
    cards: [],
    board: req.board._id
  })
  
  req.board.lists.push(newList)
  req.board.save()
  newList.save()
  req.app.get('io').emit('newList', newList);
  res.status(200).send(newList)
}

exports.deleteList = (req, res) => {
  ListModel.deleteOne({_id: req.list._id})
  .then(() => {

    Board.updateOne({_id: req.list.board}, {'$pull': {'lists': req.list._id}})
    .exec(err => {
      if (err) throw err;
      req.app.get('io').emit('deleteList', req.list._id);
      res.status(200).send(req.list._id);
    })
  })
}

exports.updateListName = (req, res) => {
  const newName = req.body.name;

  if (newName) {
    ListModel.findOneAndUpdate({_id: req.list._id}, {name: newName}, {new: true})
    .exec((err, updatedList) => {
      if (err) throw err;
      req.app.get('io').emit('updateList', updatedList);
      res.status(200).json(updatedList);
    })

  } else {
    res.status(400).send('Request must include name');
  }
}