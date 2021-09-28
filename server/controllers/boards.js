const Board = require('../models/board');
const Workspace = require('../models/workspace');

exports.getBoards = (req, res) => {
  Board.find({})
    .populate("lists")
    .exec((err, boards) => {
      if (err) return next(err);
      res.status(200).json(boards);
    })
}

exports.getBoard = (req, res) => {
  res.status(200).json(req.board);
}

exports.deleteBoard = (req, res) => {
  // deleteOne triggers middleware on the board schema (located in models/board.js) which deletes all lists refrenced by this board

  Board.deleteOne({_id: req.board._id})
  .then(() => {

    // This code is what removes the board from the workspace's board referenes
    Workspace.updateOne({_id: req.board.workspace}, {'$pull': {'boards': req.board._id}})
    .exec(err => {
      if (err) throw err
      res.status(200).send(req.board._id);
    })  
  })  
};

exports.updateBoardName = (req, res) => {

  if (!req.body.name) {
    res.status(400).send("No name param included in request body")
    return res.end();
  } 

  const update = req.body.name;
  const io = req.app.get('io');

  Board.findOneAndUpdate({_id: req.board._id}, update, { new: true })
    .exec((err, updatedBoard) => {
      if (err) throw err;

      io.emit('updatedBoard', JSON.stringify(updatedBoard));
      res.status(200).json(updatedBoard);
    })

}

// Changed this function to use findOne(), which will fetch the only workspace in the db
// The hardcoded id threw an error because the ids will be different for each local db
exports.postBoard = (req, res) => {
  if (!req.body.name) {
    res.status(400).send("No name included in request body")
    return res.end();
  }
  
  Workspace.findOne()
  .exec((err, workspace) => {
    const board = new Board({
      name: req.body.name,
      lists: [],
      workspace: workspace._id
    });

    req.app.get('io').emit('newBoard', board);

    board.save()
    workspace.boards.push(board);
    workspace.save();
    res.status(200).send(board);
  })
};

