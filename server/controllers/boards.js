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
  // If the board wasn't found, the req will have an error property 
  if (req.error === '404') {
    res.writeHead(404, 'Board not found');
    return res.end();
  }

  res.status(200).json(req.board);
}

exports.deleteBoard = (req, res) => {
  if (req.error === '404') {
    res.writeHead(404, 'Board not found');
    return res.end();
  }

  Board.deleteOne({_id: req.board._id})
    .exec((err, board) => {
      if (err) throw err;
      res.status(200).send("Board deleted");
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