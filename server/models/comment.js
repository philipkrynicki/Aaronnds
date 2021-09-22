const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  card: {type: Schema.Types.ObjectId, ref: 'Card'}
})

module.exports = mongoose.model('Comment', commentSchema);