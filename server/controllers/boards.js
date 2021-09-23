const Board = require('../models/board');
const Workspace = require('../models/workspace');
const List = require('../models/list');
const CascadeDelete = require('../util/cascading-deletes');

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
  Board.deleteOne({_id: req.board._id})
    .exec((err, board) => {
      if (err) throw err;
      res.status(200).send("Board deleted");
    });
};

exports.updateBoardName = (req, res) => {
  const update = req.body;

  Board.findOneAndUpdate({_id: req.board._id}, update, { new: true })
    .exec((err, updatedBoard) => {
      if (err) throw err;
      res.status(200).json(updatedBoard)
    })

}

// Changed this function to use findOne(), which will fetch the only workspace in the db
// The hardcoded id threw an error because the ids will be different for each local db
exports.postBoard = (req, res) => {
  Workspace.findOne()
  .exec((err, workspace) => {
    const board = new Board({
      name: req.body.name,
      lists: [],
      workspace: workspace._id
    });

    board.save()
    workspace.boards.push(board);
    workspace.save();
    res.status(200).send(board);
  })
};

