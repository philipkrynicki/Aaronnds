const List = require('../models/list');

exports.deleteList = (req, res) => {
  List.deleteOne({_id: req.list._id})
  .exec(err => {
    if (err) throw err;
    res.status(200).send("List deleted");
  })
}