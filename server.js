
/**
 * Module dependencies.
 */

require( 'coffee-script' );

var express = require('express'), RedisStore = require('connect-redis')(express);

var app = module.exports = express.createServer();

/**
 * Configuration
 */
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('port', 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ 
    secret : 'appleappleappleappleappleappleapple', 
    store : new RedisStore 
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('test', function(){
  app.set('port', 3001);
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//helpers
require('./apps/helpers')(app);

//routes
require('./apps/authentication/routes')(app);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
