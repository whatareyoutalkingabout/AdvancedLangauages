

var express = require('express'); //accesses express framework
var routes = require('./routes'); //accesses routes folder
var user = require('./routes/user'); //accesses routes/user
var http = require('http'); //gets http framework
var path = require('path'); //used to set paths
var mongojs = require('mongojs'); //imports mongojs package
var db = mongojs('recipetest:recipetest@ds049288.mongolab.com:49288/recipes', ['Drinks']); //loads database into db variable
var app = express(); //instantiates express

//SAVE TO FILE
// var fs = require('fs'); //import file system
// fs.appendFile('fileStore/testFileIO.txt', 'Hey there Gregor!\n', function (err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("The file was saved!");
//     }
// }); 

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

app.get('/', routes.index); //sets start path to index in routes folder
app.get('/recipes', recipes); //when user navigates to to this route we pass the database object
app.get('/recipes/:key', recipes); //if user enters a recipe ID after the slash it will display recipe on page
// app.get('/myrecipes/:text'routes.myrecipes(request.params.text));
//app.get('/newrecipe', routes.newrecipe); //for adding a path to newrecipe

//app.post('/addrecipe', routes.addrecipe(db)); //adding the the db

//Creates server and loads express with the above environments set
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//used to pass data to webpages
function recipes(req, res) {

    var drinks;
    var oneDrink;
    var foods;
    var oneFood;
	if(req.params.key == null){
		db.Drinks.find({type: "cocktail"}, function(err, Drinks){
			if(err || !Drinks.length) console.log("User not found.");
			else Drinks.forEach(function(designer){
			drinks = Drinks;

				db.Drinks.find({type: "food"}, function(err, Food){
					if(err || !Food.length) console.log("User not found.");
					else Food.forEach(function(des){
					foods = Food;

						db.Drinks.find({nameid: "20thCentury"}, function(err, drink){
							if(err) console.log(err);
							else { 
								oneDrink = drink;  
						        res.render('recipelist', { //pass on data
						        "drinks_data" : drinks,
						        "foods_data" : foods,
						        "recipe_one": oneDrink
						   	    });
							}
						});
					});
				});		
			});
		});
	} else{
		db.Drinks.find({type: "cocktail"}, function(err, Drinks){
			if(err || !Drinks.length) console.log("User not found.");
			else Drinks.forEach(function(designer){
			drinks = Drinks;

				db.Drinks.find({type: "food"}, function(err, Food){
					if(err || !Food.length) console.log("User not found.");
					else Food.forEach(function(des){
					foods = Food;

						db.Drinks.find({nameid: req.params.key}, function(err, drink){
							if(err) console.log(err);
							else { 
								oneDrink = drink;   
						        res.render('recipelist', { //pass on data
						        "drinks_data" : drinks,
						        "foods_data" : foods,
						         "recipe_one": oneDrink
						   	    });
							}
						});
					});
				});		
			});
		});
	}
}	
