const List = require('../models/list');
const Workspace = require('../models/workspace');
const Board = require('../models/board');

exports.getBoards = (req, res) => {
  Board.find({})
    .exec((err, boards) => {
      if (err) return next(err);
      res.status(200).json(boards);
    })
}

exports.getBoard = (req, res) => {
  Board.findById(req.params.board)
    .exec((err, board) => {
      if(!board) {
        res.sendStatus(404)
      } else if (err) {
        next(err)
      }
      res.status(200).json(board)
    })
}