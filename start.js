
'use strict';
const
  
  log = require('npmlog'),
  request = require('request'),
  
  express = require('express'),
  passport = require('passport'),
  app = express(),
  
  GoogleStrategy = require('passport-google').Strategy,
  port = process.env.PORT || 5000;

passport.serializeUser(function(user, done) {
  done(null, user.identifier);
});
passport.deserializeUser(function(id, done) {
  done(null, { identifier: id });
});
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:'+port+'/auth/google/return',
    realm: 'http://localhost:'+port+'/'
  },
  function(identifier, profile, done) {
    profile.identifier = identifier;
    return done(null, profile);
  }
));

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({
  secret: 'youcanttouchme',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/client'));

app.get('/auth/google/:return?',
  passport.authenticate('google', { successRedirect: '/' })
);
app.get('/auth/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.post('/auth/admin', function(req, res){
  // todo authorize admin user
  res.redirect('/adminHome.html');
});

const authed = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else if (redisClient.ready) {
    res.json(403, {
      error: "forbidden",
      reason: "not_authenticated"
    });
  } else {
    res.json(503, {
      error: "service_unavailable",
      reason: "authentication_unavailable"
    });
  }
};

app.listen(port, function(){
  console.log("listening at port " + port);
});

