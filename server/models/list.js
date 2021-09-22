const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}],
  board: {type: Schema.Types.ObjectId, ref: 'Board'}
})

module.exports = mongoose.model('List', listSchema);