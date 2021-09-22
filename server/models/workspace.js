const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  name: String,
  boards: [{type: Schema.Types.ObjectId, ref: 'Board'}],
  user: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Workspace', workspaceSchema);