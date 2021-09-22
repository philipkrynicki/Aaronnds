const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: String,
  description: String,
  activities: [String],
  labels: [String],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  list: {type: Schema.Types.ObjectId, ref: 'List'},
})

module.exports = mongoose.model('Card', cardSchema);