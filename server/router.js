const express = require("express");
const app = express();
const cors = require('cors');
const FakeData = require('./controllers/initial-data');
const Boards = require('./controllers/boards')
const Board = require('./models/board');

app.use(cors());

module.exports = function(app){

  // The :board param fetches a board if it exists
  // returns 404 if it doesn't
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
        req.error = '404';
      else if (err)
        throw err;
      else
        req.board = board;
      next();
    })
  })

  app.get('/api/workspace/boards', Boards.getBoards);
  app.get('/api/boards/:board', Boards.getBoard);
  app.delete('/api/boards/:board', Boards.deleteBoard);
  app.put('/api/boards/:board', Boards.putBoard);
  app.get('/generate-initial-data', FakeData.generateFakeData);
};