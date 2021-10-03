const jwt = require('jwt-simple');

const tokenForUser = (user) => {
  return jwt.encode({ 
    sub: user._id,
    iat: Math.round(Date.now() / 1000),
    }, 
    'verysecret')
};


exports.login = (req, res) => {
  res.send({
    token: tokenForUser(req.user)
  });
};

exports.currentUser = function(req, res) {
  const user = {
    name: req.user.name,
    token: tokenForUser(req.user)
  };

  res.send(user);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}
