var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var FacebookStrategy = require('passport-facebook');
var User = require('./models/models').User;
var photo      = '/picture?width=500&height=500';
var fb         = 'https://graph.facebook.com/';
// ----------------------------------------------
// ROUTES AND REQUEST HANDLERS
// ----------------------------------------------
var auth      = require('./routes/auth');
var profile   = require('./routes/profile');
var api       = require('./routes/api');
var projects  = require('./routes/projects');
var users     = require('./routes/users');
var posts     = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connect = process.env.MONGODB_URI || require('./models/connect');
mongoose.connect(connect);

app.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'dogecoookie',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

// ----------------------------------------------
// Passport Verification - Local and FB strategy
// ----------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// passport strategy
passport.use(new LocalStrategy(function(username, password, done) {
    // Find the user with the given username
    User.findOne({ username: username }, function (err, user) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) {
        console.error(err);
        return done(err);
      }
      // if no user present, auth failed
      if (!user) {
        console.log(user);
        return done(null, false, { message: 'Incorrect username.' });
      }
      // if passwords do not match, auth failed
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      // auth has has succeeded
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FB_API_ID,
    clientSecret: process.env.FB_API_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
	  profileFields:['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ 
      facebookId: profile.id,
      name: profile.displayName,
      imageUrl: fb + profile.id + photo,
      count: 0

    }, function (err, user) {
      console.log(user);
		return cb(err, user);
    });
  }
));

// ----------------------------------------------
// Route Setting
// ----------------------------------------------
app.use('/api/', api);
app.use('/', auth(passport));
app.use('/', profile);
app.use('/', projects);
app.use('/', users);
app.use('/', posts);

// ----------------------------------------------
// ERROR HANDLERS
// ----------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
