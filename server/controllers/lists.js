const Workspace = require('../models/workspace');
const List = require('../models/list')

exports.getLists = (req, res) => {
  List.find({board: req.params.board})
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
  List.find({board: req.params.board})
  .exec((err, newList) => {
    if (!board) {
      res.sendStatus(404);
    }
    if (err) return next(err);
    newList.push(list).save();
    res.status(200).send(newList)
  })
}
