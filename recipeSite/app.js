
var express = require('express'); //accesses express framework
var routes = require('./routes'); //accesses routes folder
var user = require('./routes/user'); //accesses routes/user
var http = require('http'); //gets http framework
var path = require('path'); //used to set paths
var databaseUrl = "recipetest:recipetest@ds051868.mongolab.com:51868/recipes"; // "username:password@example.com/mydb"
var collections = ['Drinks'] //Set collection into a variable for reference
var db = require("mongojs").connect(databaseUrl, collections); //Load database url link and collection into mongojs package
var app = express(); //instantiates express

// all environments
app.set('port', process.env.PORT || 3000); //sets port
app.set('views', __dirname + '/views'); //sets default view directory
app.set('view engine', 'jade'); //sets view engine
//app.use(express.favicon()); //loads favicon
app.use(express.logger('dev')); //uses a developement environment
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'))); //sets public directory

// development only. can set to production environment.
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Error Handling Handles 500 error, might need to develop more surroding this.
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('500.jade', {title: 'Oops! something broke'});
});

// handle 404 errors by redirect to 404
//*MUST BE LAST OF APP.USE
app.use(function(req,res){
    res.render('404.jade', {title: "Page not found"});
});

//Creates server and loads express with the above environments set
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server); //sets the socket.io to listen on the server 

app.get('/', routes.recipelist); //sets start path to index in routes folder
app.get('/recipes', routes.recipelist); //when user navigates to to this route we pass the database object
app.get('/recipes/:key', routes.recipelist); //if user enters a recipe ID after the slash it will display recipe on page
// app.get('/myrecipes/:text'routes.myrecipes(request.params.text));
app.get('/newrecipe', routes.newrecipe(db, io)); //for adding a path to newrecipe

 