const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}],
  board: {type: Schema.Types.ObjectId, ref: 'Board'}
})

listSchema.pre('deleteMany', {document: false, query: true}, async function(next) {
  const lists = await this.model.find(this.getFilter());

  // Get the list ids
  const ids = lists.map(list => {
    return list._id;
  })

  // Delete all cards that reference any of the ids
  lists[0].model('Card').deleteMany({list: {'$in': ids}}, next);
})

module.exports = mongoose.model('List', listSchema);