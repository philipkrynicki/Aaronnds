const Comment = require('../models/comment');
const User = require('../models/user');

exports.getComments = (req, res) => {
  res.status(200).json(req.card.comments)
}

exports.postComment = async (req, res) => {
  const user = await User.findOne({})
 
  const newComment = new Comment({
    text: req.body.text,
    user: user._id,
    card: req.card._id
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
  Comment.deleteOne({_id: req.params.card})
    .exec((err, comment) => {
      if (err) next(err)
      res.status(200).send("Comment deleted")
    })
}

exports.updateComment = (req, res) => {
  const update = req.body;

  Comment.findOneAndUpdate({ _id: req.params.comment }, update, { new: true })
    .exec((err, updatedComment) => {
      if (err) next(err)
      res.status(200).json(updatedComment)
    })
}