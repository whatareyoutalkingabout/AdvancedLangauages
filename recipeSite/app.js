

var express = require('express'); //accesses express framework
var routes = require('./routes'); //accesses routes folder
var user = require('./routes/user'); //accesses routes/user
var http = require('http'); //gets http framework
var path = require('path'); //used to set paths
//var mongo = require('mongodb'); 
var monk = require('monk'); //imports monk (which is used to connect mongoDB)
var db = monk('localhost:27017/recipecollection'); //use monk to link to db
//var db2 = monk('localhost:27017/recipecollection'); //use monk to link to db
// var mongojs = require('mongojs');
// var db = mongojs('recipetest:recipetest@ds049288.mongolab.com:49288/recipes', ['Designer']);


//CRAPPY BUT INTERESTING IDEA KEEP LOOKING
// app.get('/search/', function(req,res){

//   // Parse the query
//   var dbQuery = url.parse(req.url, true).query;
//   var product = dbQuery.product;
//   var category = dbQuery.category;
//   console.log('Searching for: ' + product + ' in ' + category);

//   //Mongo DB setup then query
//   var result;
//   var server = new mongodb.Server('23.23.129.158', 27017, {});
//   new mongodb.Db('militaryListDB', server, {}).open(function(err, client){
//     if(err) throw err;

//     var collection = new mongodb.Collection(client, 'products');
//     collection.find({}).toArray(function(err, results){
//       console.log(results);
//       console.log(JSON.stringify(results));
//       res.render('results', {result: JSON.stringify(results), title: 'Test'});
//     });
//   });
// });




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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index); //sets start path to index in routes folder
app.get('/recipes', routes.recipelist(db)); //when user navigates to to this route we pass the database object
app.get('/recipes/:text', routes.recipelist(db));
// app.get('/myrecipes/:text'routes.myrecipes(request.params.text));
app.get('/newrecipe', routes.newrecipe); //for adding a path to newrecipe

app.post('/addrecipe', routes.addrecipe(db)); //adding the the db

//Creates server and loads express with the above environments set
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

