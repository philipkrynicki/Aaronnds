const passport = require('passport');
const User = require('../models/user');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'name' };

const localLogin = new LocalStrategy(localOptions, (name, password, done) => {
  User.findOne({ name: name }, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false, { message: 'No user with that name' }) }
    
    if (password !== user.password) {
      return done(null, false, { message: 'Incorrect password.'})
    }

    return done(null, user);
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'verysecret'
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false) }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);