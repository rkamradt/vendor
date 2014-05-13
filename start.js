
'use strict';
const
  
  log = require('npmlog'),
  request = require('request'),
  express = require('express'),
  passport = require('passport'),
  catalog = require('./lib/catalog.js'),
  app = express(),
//  routes = require("./app/routes"),
  exphbs = require("express3-handlebars"),
//  seeder = require("./app/seeder"),
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

app.set('port', port);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride())
app.use(express.cookieParser());
app.use(express.session({
  secret: 'youcanttouchme',
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);
app.use('/', express.static(__dirname + '/client'));
if('development' == app.get('env')) {
    app.use(express.errorHandler());
}
app.set('views', __dirname + '/views');
//app.engine('handlebars', exphbs({
//    defaultLayout: 'main',
//    layoutsDir: app.get('views') + '/layouts'
//}));
//app.set('view engine', 'handlebars');
//routes.initialize(app);

app.get('/auth/google/:return?',
  passport.authenticate('google', { successRedirect: '/' })
);
app.get('/auth/logout', function(req, res){
  req.logout();
  res.redirect('/');            
});

const authed = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json(503, {
      error: "service_unavailable",
      reason: "authentication_unavailable"
    });
  }
};

app.get('/api/user', authed, function(req, res){
  res.json(req.user);
});

app.post('/auth/admin', function(req, res){
  // todo authorize admin user
  res.redirect('/adminHome.html');
});

app.post('/admin/item/addBulk', function(req, res){
//  var list = req.body;
//  var items = list.split(".")
//  for(var i in items) {
//    var parts = list.split("-");
//    var item = catalog.createItem(parts[0],parts[1]);
//    catalog.addItem(item);
//  }
//  catalog.addItem(item); 
//  res.json(200, item);
  res.redirect('/adminHome.html');
});
app.post('/admin/item/add', function(req, res){
  var item = catalog.createItem(req.query.name,req.query.description);
  catalog.addItem(item); 
  res.redirect('/adminHome.html');
});
app.put('/admin/item/mod', function(req, res){
  var item = catalog.createItem(req.query.name,req.query.description);
  catalog.addItem(item); 
  res.redirect('/adminHome.html');
});
app.del('/admin/item/del/:name', function(req, res){
//  catalog.deleteItem(req.params.name);
  res.redirect('/adminHome.html');
});
app.get('/admin/item/list', function(req, res){
  var itemArray = catalog.listItems();
  res.redirect('/adminHome.html');
});
app.get('/admin/item/:name', function(req, res){
  var item = catalog.findItem(req.params.name);
  res.redirect('/adminHome.html');
});


app.listen(port, function(){
  console.log("listening at port " + port);
});

