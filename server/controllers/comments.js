const Comment = require('../models/comment');
const Card = require('../models/card');
const User = require('../models/user');

exports.getComments = (req, res) => {
  res.status(200).json(req.card.comments)
}

exports.postComment = async (req, res) => {
  const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short'});

  const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  const creationDate = now + " " + today;

  if (!req.body.text) {
    res.status(400).send("No comment text included in request")
    return res.end();
  } 

  const user = await User.findOne({})
  
  const newComment = new Comment({
    text: req.body.text,
    user: user._id,
    userName: user.name,
    card: req.body.card,
    created: creationDate
  });
 
  user.comments.push(newComment);
  user.save();

  req.card.comments.push(newComment);
  req.card.save();

  newComment.save((err, comment) => {
    if (err) next(err);
    res.status(200).json(comment);
  })
}

exports.deleteComment = (req, res) => {
  Comment.deleteOne({_id: req.comment._id})
  .then(() => {

    Card.updateOne({_id: req.comment.card}, {'$pull': {'comments': req.comment._id}})
    .then(() => {
      User.updateOne({_id: req.comment.user}, {'$pull': {'comments': req.comment._id}})
      .exec(err => {
        if (err) next(err)
        res.status(200).send(req.comment._id)
      })

    })

  })
}

exports.updateComment = (req, res) => {
  if (!req.body.text) {
    res.status(400).send("No comment text included in request")
    return res.end();
  } 

  const update = { text: req.body.text };

  Comment.findOneAndUpdate({ _id: req.params.comment }, update, { new: true })
    .exec((err, updatedComment) => {
      console.log(updatedComment)
      if (err) next(err)
      res.status(200).json(updatedComment)
    })
}