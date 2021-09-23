const User = require('../models/user');
const Workspace = require('../models/workspace');

// Generates a hardcoded user and workspace
exports.generateUser = (req, res) => {
  let user = new User({
    name: 'Aaron',
    password: 'password',
    workspaces: [],
    comments: []
  })

  const workspace = new Workspace({
    name: 'My Workspace',
    user: user._id,
    boards: []
  })

  user.workspaces.push(workspace);

  user.save(err => {
    if (err) throw err;
  })

  workspace.save(err => {
    if (err) throw err;
  })

  res.status(200).json(user);
}