const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: String,
  lists: [{type: Schema.Types.ObjectId, ref: 'List'}],
  workspace: {type: Schema.Types.ObjectId, ref: 'Workspace'}
})

boardSchema.pre('deleteOne', {document: false, query: true}, async function(next) {
  const board = await this.model.findOne(this.getFilter());
  board.model('List').deleteMany({board: board._id}, next);
})

module.exports = mongoose.model('Board', boardSchema);