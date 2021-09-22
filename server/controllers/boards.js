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

exports.postBoard = (req, res) => {
  let board = new Board({
    name: req.body.name,
    lists: [],
    workspace: 'placeholder'
  });
  board.save((err, newBoard) => {
    if (err) return next(err);
    res.send(newBoard);
  });
};

exports.getLists = (req, res) => {
  List.find({})
    .exec((err, lists) => {
      if (err) return next(err);
      res.status(200).json(lists);
    });
};

exports.getList = () => {
  List.findById(req.params.List)
  .exec((err, list) => {
    if(!list) {
      res.sendStatus(404);
    }
    if (err) {
      next(err);
    }
    res.status(200).json(board);
  });
};

exports.postList = (req, res) => {
  let list = new List({
    name: req.body.name,
    cards: [],
    board: {}
  })
}