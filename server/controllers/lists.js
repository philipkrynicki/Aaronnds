const List = require('../models/list')

exports.getLists = (req, res) => {
  List.find({board: req.board._id})
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

exports.deleteList = (req, res) => {
  List.deleteOne({_id: req.list._id})
  .exec(err => {
    if (err) throw err;
    res.status(200).send("List deleted");
  })
}

exports.updateListName = (req, res) => {
  const newName = req.body.name;

  if (newName) {
    List.findOneAndUpdate({_id: req.list._id}, {name: newName}, {new: true})
    .exec((err, updatedList) => {
      if (err) throw err;
      res.status(200).json(updatedList);
    })

  } else {
    res.status(400).send('Request must include name');
  }
}