const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: String,
  lists: [{type: Schema.Types.ObjectId, ref: 'List'}],
  workspace: {type: Schema.Types.ObjectId, ref: 'Workspace'}
})

module.exports = mongoose.model('Board', boardSchema);