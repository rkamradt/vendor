
'use strict';
const
  
  log = require('npmlog'),
  request = require('request'),
  express = require('express'),
  passport = require('passport'),
  catalog = require('./lib/catalog.js'),
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
app.post('/admin/item/add', function(req, res){
  var item = catalog.createItem(req.query.name,req.query.description);
  catalog.addItem(item); 
  res.json(200, item);
});
app.put('/admin/item/mod', function(req, res){
  var item = catalog.createItem(req.query.name,req.query.description);
  catalog.addItem(item); 
  res.json(200, item);
});
app.del('/admin/item/:name', function(req, res){
  catalog.deleteItem(req.params.name);
  res.json(200, { });
});
app.get('/admin/item/list', function(req, res){
  var itemArray = catalog.listItems();
  res.json(200, itemArray);
});
app.get('/admin/item/:name', function(req, res){
  var item = catalog.findItem(req.params.name);
  res.json(200, item);
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

