const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  workspaces: [{type: Schema.Types.ObjectId, ref: 'Workspace'}]
})

module.exports = mongoose.model('User', userSchema);