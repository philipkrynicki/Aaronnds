const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}],
  board: {type: Schema.Types.ObjectId, ref: 'Board'},
  position: {type: Number}
})

// AutoIncrement will assign new lists their position number
listSchema.plugin(AutoIncrement, {id: 'position_seq', inc_field: 'position', reference_fields: ['board']});

listSchema.pre('deleteOne', {document: false, query: true}, async function(next) {
  const list = await this.model.findOne(this.getFilter());
  list.model('Card').deleteMany({list: list._id}, next); 
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