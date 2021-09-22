const faker = require('faker');
const User = require('../models/user');
const Workspace = require('../models/workspace');
const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const Comment = require('../models/comment');

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
    card.labels = [faker.commerce.color(), faker.commerce.color()];
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

exports.generateFakeData = (req, res) => {
  // Generate a random user
  let user = new User();

  user.name = faker.name.firstName();
  user.password = faker.lorem.word();
  user.workspaces = [];
  user.comments = [];

  // Generate a workspace
  // For now, we'll only work with a single user and workspace in the db
  let workspace = new Workspace();

  workspace.name = faker.company.companyName();
  workspace.user = user._id;
  workspace.boards = [];

  user.workspaces.push(workspace);

  // Generate random boards
  let board1 =  new Board();
  const board1Id = board1._id;

  board1.name = faker.commerce.department();
  board1.lists = generateLists(board1Id);
  board1.workspace = workspace._id;

  let board2 =  new Board();
  const board2Id = board2._id;

  board2.name = faker.commerce.department();
  board2.lists = generateLists(board2Id);
  board2.workspace = workspace._id;

  board1.save(err => {
    if (err) throw err;
  })

  board2.save(err => {
    if (err) throw err;
  })

  workspace.boards.push(board1);
  workspace.boards.push(board2);

  user.save(err => {
    if (err) throw err;
  })

  workspace.save(err => {
    if (err) throw err;
  })
}