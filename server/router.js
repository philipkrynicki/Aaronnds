const express = require("express");
const app = express();
const cors = require('cors');
const FakeData = require('./controllers/initial-data');
<<<<<<< HEAD
const Boards = require('./controllers/boards')
const Lists = require('./controllers/lists')
=======
const Boards = require('./controllers/boards');
const Lists = require('./controllers/lists');
const Cards = require('./controllers/cards')
>>>>>>> master
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
      if(!board) {
        res.writeHead(404, 'Board not found'); // Send 404 if the board isn't found
        return res.end();
      }
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
      if(!list) {
        res.writeHead(404, 'List not found');
        return res.end();
      }
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

      if(!card) {
        res.writeHead(404, 'Card not found');
        return res.end();
      }
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
      if(!comment) {
        res.writeHead(404, 'Comment not found');
        return res.end();
      }
      else if (err)
        throw err;
      else
        req.comment = comment;
      next();
    })
  })

  // ROUTES
  app.get('/generate-initial-data', FakeData.generateFakeData);

  app.get('/api/workspace/boards', Boards.getBoards);
  app.post('/api/workspace/boards', Boards.postBoard)
  app.get('/api/boards/:board', Boards.getBoard);
  app.delete('/api/boards/:board', Boards.deleteBoard);
  app.put('/api/boards/:board', Boards.updateBoardName);
  app.get('/api/boards/:board/lists', Lists.getLists)
  app.post('/api/boards/:board/lists', Lists.postList)

  app.get('/generate-initial-data', FakeData.generateFakeData);

  app.delete('/api/lists/:list', Lists.deleteList);
  app.put('/api/lists/:list', Lists.updateListName);

  app.get('/api/lists/:list/cards', Cards.getCards);
  app.get('/api/cards/:card', Cards.getCard);
  app.post('/api/lists/:list/cards', Cards.postCard);
  app.delete('/api/cards/:card', Cards.deleteCard);
  app.put('/api/cards/:card', Cards.updateCard);
};