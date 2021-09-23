const faker = require('faker');
const Workspace = require('../models/workspace');
const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

// Generate random lists
const generateLists = (boardId) => {
  let listArr = [];

  for (let i = 0; i < 3; i++) {
    let list = new List();
    const id = list._id;

    list.name = faker.lorem.words();
    list.cards = generateCards(id);
    list.board = boardId;

    listArr.push(list);

    list.save(err => {
      if (err) throw err;
    })
  }

  return listArr;
}

// Generate random cards
const generateCards = (listId) => {
  let cardArr = [];

  for (let i = 0; i < 3; i++) {
    let card = new Card();

    card.name = faker.lorem.sentence();
    card.description = faker.lorem.paragraph(2);
    card.labels = [];
    card.activities = [];
    card.comments = [];
    card.list = listId;

    cardArr.push(card);

    card.save(err => {
      if (err) throw err;
    })
  }

  return cardArr;
}

exports.generateBoards = (req, res) => {

  Workspace.findOne()
  .exec((err, workspace) => {
    if (err) throw err;

    if (workspace) {
      for (let i = 0; i < 3; i++) {
        let board = new Board()
  
        board.name = faker.commerce.department();
        board.lists = generateLists(board._id);
        board.workspace = workspace._id;
        
        board.save(err => {
          if (err) throw err;
        });

        workspace.boards.push(board);
      }

    workspace.save();
    res.status(200).json(workspace.boards);

    } else {
      res.status(404).send('No user or workspace exists, go to /generate-user first');
    }  
  })
}