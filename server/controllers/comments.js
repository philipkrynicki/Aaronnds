const Comment = require('../models/comment');
const Card = require('../models/card');
const User = require('../models/user');

exports.getComments = (req, res) => {
  res.status(200).json(req.card.comments)
}

exports.postComment = async (req, res) => {
  const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short'});

  const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  const creationDate = today + ", " + now;

  if (!req.body.text) {
    res.status(400).send("No comment text included in request")
    return res.end();
  } 

  const user = await User.findOne({})
  
  const newComment = new Comment({
    text: req.body.text,
    user: user._id,
    card: req.body.card,
    created: creationDate
  });
 
  user.comments.push(newComment);
  user.save();

  req.card.comments.push(newComment);
  req.card.save();
  newComment.populate('user')
  newComment
    .save((err, comment) => {
    if (err) next(err);
    req.app.get('io').emit('postComment', newComment);
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
        req.app.get('io').emit('deleteComment', req.comment._id);
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
    .populate('user')
    .exec((err, updatedComment) => {
      if (err) next(err)
      req.app.get('io').emit('updateComment', updatedComment);
      res.status(200).json(updatedComment)
    })
}