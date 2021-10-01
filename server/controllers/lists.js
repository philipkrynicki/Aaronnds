const List = require('../models/list')
const Board = require('../models/board');

exports.getLists = (req, res) => {
  List.find({board: req.board._id})
  .populate('cards')
  .sort({position: 1})
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
  req.app.get('io').emit('newList', newList);
  res.status(200).send(newList)
}

exports.deleteList = (req, res) => {
  List.deleteOne({_id: req.list._id})
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
    List.findOneAndUpdate({_id: req.list._id}, {name: newName}, {new: true})
    .exec((err, updatedList) => {
      if (err) throw err;
      req.app.get('io').emit('updateList', updatedList);
      res.status(200).json(updatedList);
    })

  } else {
    res.status(400).send('Request must include name');
  }
}

// Changes a list's postion 
exports.moveList = (req, res) => {
  const newPosition = parseInt(req.body.newPosition);
  const oldPosition = req.list.position;

  if (!newPosition) {
    res.status(400).send("newPosition required in request body")
    return res.end();
  }

  // Update the list's position field
  List.findOneAndUpdate({_id: req.list._id}, {position: newPosition}, {new: true})
  .exec((err, movedList) => {
    if (err) throw err;

    // When moving closer to the start, increment all lists in between the new and old positions
    if (newPosition < oldPosition) {
      List.find({board: movedList.board, position: {$gte: newPosition, $lt: oldPosition}, _id: {$ne: movedList._id}})
      .exec((err, lists) => {
        if (err) throw err;

        lists.forEach(list => {
          list.position += 1;
          list.save();
        })

      })

    // When moving away from the start, decrement all lists in between the new and old positions
    } else if (newPosition > oldPosition) {
      List.find({board: movedList.board, position: {$lte: newPosition, $gt: oldPosition}, _id: {$ne: movedList._id}})
      .exec((err, lists) => {
        if (err) throw err;

        lists.forEach(list => {
          list.position -= 1;
          list.save();
        })        
      })
    }

    res.status(200).json({
      movedList: movedList,
    });
    
  })
}