const Board = require('../models/board');
const Card = require('../models/card');

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

exports.postBoard = (req, res) => {
  let board = new Board({
    name: req.body.name,
    lists: [],
    workspace: Workspace.find()
  });
  board.save((err, newBoard) => {
    if (err) return next(err);
    res.status(200).send(newBoard);
  });
};

