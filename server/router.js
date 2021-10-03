const express = require("express");
const app = express();
const passport = require('passport');
const passportService = require('./services/passport');
const GenerateUser = require('./util/generate-user');
const GenerateData = require('./util/generate-data');

const Boards = require('./controllers/boards');
const Lists = require('./controllers/lists');
const Cards = require('./controllers/cards');
const Comments = require('./controllers/comments');
const Labels = require('./controllers/labels');
const Activities = require('./controllers/activities');
const Authentication = require('./controllers/authentication');

const Board = require('./models/board');
const List = require('./models/list');
const Card = require('./models/card');
const Comment = require('./models/comment');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

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
      path: 'comments',
      populate: {
        path: 'user',
        model: "User"
      }
    })
    .populate('list')
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

  //To-do: Add requireAuth middleware to appropriate routes once frontend is ready for that
  // ROUTES
  app.get('/generate-boards', GenerateData.generateBoards);
  app.get('/generate-user', GenerateUser.generateUser);

  app.get('/api/workspace/boards', Boards.getBoards);
  app.post('/api/workspace/boards', requireAuth, Boards.postBoard)
  app.get('/api/boards/:board', Boards.getBoard);
  app.delete('/api/boards/:board', requireAuth, Boards.deleteBoard);
  app.put('/api/boards/:board', requireAuth, Boards.updateBoardName);
  
  app.get('/api/boards/:board/lists', Lists.getLists)
  app.post('/api/boards/:board/lists', requireAuth, Lists.postList)
  app.delete('/api/lists/:list', requireAuth, Lists.deleteList);
  app.put('/api/lists/:list', requireAuth, Lists.updateListName);
  app.put('/api/lists/:list/move', requireAuth, Lists.moveList);

  app.get('/api/lists/:list/cards', Cards.getCards);
  app.get('/api/cards/:card', Cards.getCard);
  app.post('/api/lists/:list/cards', requireAuth, Cards.postCard);
  app.put('/api/lists/:list/cards/:card', requireAuth, Cards.moveCard);
  app.delete('/api/cards/:card', requireAuth, Cards.deleteCard);
  app.put('/api/cards/:card', requireAuth, Cards.updateCard);
  app.put('/api/cards/:card/position', requireAuth, Cards.updateCardPosition);

  app.post('/api/cards/:card/comments', requireAuth, Comments.postComment);
  app.get('/api/cards/:card/comments', Comments.getComments);
  app.delete('/api/comments/:comment', requireAuth, Comments.deleteComment);
  app.put('/api/comments/:comment', requireAuth, Comments.updateComment);

  app.get('/api/cards/:card/labels', Labels.getLabels);
  app.post('/api/cards/:card/labels',  Labels.postLabel)
  app.delete('/api/cards/:card/labels',  Labels.deleteLabel)

  app.get('/api/cards/:card/activity', Activities.getActivity);
  app.post('/api/cards/:card/activity', Activities.postActivity);

  app.post('/auth/login', requireSignin, Authentication.login);
  app.post('/auth/logout', Authentication.logout)

};