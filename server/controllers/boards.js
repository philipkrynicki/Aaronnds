const List = require('../models/list');
const Workspace = require('../models/workspace');
const Board = require('../models/board');
const workspace = require('../models/workspace');

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

exports.deleteBoard = (req, res) => {
  Board.deleteOne({_id: req.params.board})
    .exec((err, board) => {
      if(!board) {
        res.sendStatus(404);
      } else if (err) {
        next(err)
      }
      res.status(200).send("Board deleted")
    });
};

exports.putBoard = (req,res) => {
  const update = req.body;

  Board.findOneAndUpdate({_id: req.params.board}, update, { new: true })
    .exec((err, updatedBoard) => {
      if(!board) {
        res.sendStatus(404);
      } else if (err) {
        next(err)
      }
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

exports.getLists = (req, res) => {
  List.find({})
    .exec((err, lists) => {
      if (!lists) {
        res.sendStatus(404);
      }
      if (err) return next(err);
      res.status(200).json(lists);
    });
};

exports.postList = (req, res) => {
  let list = new List({
    name: req.body.name,
    cards: [],
    board: req.params.id
  })
}


