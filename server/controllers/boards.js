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
  if (req.error === '404') {
    res.writeHead(404, 'Board not found');
    res.end();
  }

  res.status(200).json(req.board);
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
      if(!updatedBoard) {
        res.sendStatus(404);
      } else if (err) {
        next(err)
      }
      res.status(200).json(updatedBoard)
    })

}