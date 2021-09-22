const List = require('../models/list');

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