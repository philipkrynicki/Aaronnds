const express = require("express");
const app = express();
const cors = require('cors');
const FakeData = require('./controllers/initial-data');
const Boards = require('./controllers/boards');
const Board = require('./models/board');
const List = require('./models/list');
const Card = require('./models/card');
const Comment = require('./models/comment');

app.use(cors());

module.exports = function(app){

  // ROUTER PARAMS

  // Fetches a board
  app.param('board', (req, res, next, id) => {
    Board.findById(id)
    .populate({
      path: 'lists',
      populate: {
        path: 'cards',
        model: 'Card'
      }
    })
    .exec((err, board) => {
      if(!board) 
        req.error = '404'; // give the request an error property if the board isn't found
      else if (err)
        throw err;
      else
        req.board = board; // attach the found board to the request
      next();
    })
  })

  // Fetches a list
  app.param('list', (req, res, next, id) => {
    List.findById(id)
    .populate({
      path: 'cards'
    })
    .exec((err, list) => {
      if (!list)
        req.error = '404';
      else if (err)
        throw err;
      else
        req.list = list;
      next();
    })
  })

  // Fetches a card
  app.param('card', (req, res, next, id) => {
    Card.findById(id)
    .populate({
      path: 'comments'
    })
    .exec((err, card) => {
      if (!card)
        req.error = '404';
      else if (err)
        throw err;
      else
        req.card = card;
      next();
    })
  })

  // Fetches a comment
  app.param('comment', (req, res, next, id) => {
    Comment.findById(id)
    .populate('user')
    .exec((err, comment) => {
      if (!comment)
        req.error = '404';
      else if (err)
        throw err;
      else
        req.comment = comment;
      next();
    })
  })

  // ROUTES
  app.get('/api/workspace/boards', Boards.getBoards);
  app.get('/api/boards/:board', Boards.getBoard);
  app.delete('/api/boards/:board', Boards.deleteBoard);
  app.put('/api/boards/:board', Boards.putBoard);
  app.get('/generate-initial-data', FakeData.generateFakeData);
};