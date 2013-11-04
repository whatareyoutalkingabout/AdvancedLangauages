
var express = require('express'); //accesses express framework
var routes = require('./routes'); //accesses routes folder
var user = require('./routes/user'); //accesses routes/user
var http = require('http'); //gets http framework
var path = require('path'); //used to set paths
// var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
// var uristring = 
//   process.env.MONGOLAB_URI || 
//   process.env.MONGOHQ_URL || 
//   'recipetest:recipetest@ds051868.mongolab.com:51868/recipes';

var databaseUrl = "recipetest:recipetest@ds051868.mongolab.com:51868/recipes"; // "username:password@example.com/mydb"
var collections = ['Drinks']
var db = require("mongojs").connect(databaseUrl, collections);

var app = express(); //instantiates express


// mongoose.connect(uristring, function (err, res) {
//   if (err) { 
//     console.log ('ERROR connecting to: ' + uristring + '. ' + err);
//   } else {
//     console.log ('Succeeded connected to: ' + uristring);
//   }
// });



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

//Error Handling Handles 500 error, might need to develop more surroding this.
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('500.jade', {title: 'something broke'});
});

// handle 404 errors by redirect to 404
//*MUST BE LAST OF APP.USE
app.use(function(req,res){
    res.render('404.jade', {title: "Page not found"});
});

app.get('/', routes.index); //sets start path to index in routes folder
app.get('/recipes', recipes); //when user navigates to to this route we pass the database object
app.get('/recipes/:key', recipes); //if user enters a recipe ID after the slash it will display recipe on page
// app.get('/myrecipes/:text'routes.myrecipes(request.params.text));
app.get('/newrecipe', routes.newrecipe); //for adding a path to newrecipe

app.post('/addrecipe', routes.addrecipe(db)); //adding the the db
// app.post('/addrecipe', insert); //adding the the db

//Creates server and loads express with the above environments set
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function insert(req,res){

        var recipeName = req.body.recipename;
        var id = req.body.nameid;
        var type = req.body.typeOfRecipe;
        var glassType = req.body.typeOfglass;
        var ingred1 = req.body.ingredient1;
        var ingred2 = req.body.ingredient2;
        var ingred3 = req.body.ingredient3;
        var ingred4 = req.body.ingredient4;
        var ingred5 = req.body.ingredient5;
        var ingred6 = req.body.ingredient6;
        var ingred7 = req.body.ingredient7;
        var ingred8 = req.body.ingredient8; 
        var garnsh = req.body.garnish;       
        var direction1 = req.body.note1;
        var direction2 = req.body.note2;
        var direction3 = req.body.note3;
        var direction4 = req.body.note4;
        var direction5 = req.body.note5;
        var direction6 = req.body.note6;                                

	db.Drinks.save({            
		"name" : recipeName,
		"nameid": id,
		"type" : type,
		"glass" : glassType,
        "ingredient" : [ingred1, ingred2, ingred3, ingred4, ingred5, ingred6, ingred7, ingred8],
        "garnish": garnsh, 
        "note": [direction1, direction2, direction3, direction4, direction5, direction6]

        }, function(err, saved) {
		if( err || !saved ) console.log("User not saved");
		else {
		    // If it worked, forward to success page
		    res.redirect("recipes");
		    // And set the header so the address bar doesn't still say /addrecipe
		    res.location("recipes");
		    console.log("User saved");
			}
		});
}

// var Drinks
;
//used to pass data to webpages
function recipes(req, res) {

    var drinks;
    var oneDrink;
    var foods;
    var oneFood;
    var nullKey = null;
    var query;

	if( req.params.key == nullKey ){
		query = "20thCentury";
	} else {
		query = req.params.key;
	}
	db.Drinks.find({type: "cocktail" }, function(err, Drinks){
		if(err || !Drinks.length) console.log("User not found.");
		else Drinks.forEach(function(designer){
		drinks = Drinks;
		console.log(drinks);

			db.Drinks.find({type: "food"}, function(err, Food){
				if(err || !Food.length) console.log("User not found.");
				else Food.forEach(function(des){
				foods = Food;
				console.log(foods);

					db.Drinks.find({nameid: query}, function(err, drink){
						if(err) console.log(err);
						else { 
							oneDrink = drink;  
							console.log(oneDrink);
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

function addRecipe (req, res){

    return function(req, res) {

    // Get our form values. These rely on the "name" attributes
    //<TODO> add dynamic values
    //<TODO> add Prep time, cooking time, and servings to food
    var recipeName = req.body.recipename;
    var type = req.body.typeOfRecipe;
    var ingred1 = req.body.ingredient1;
    var ingred2 = req.body.ingredient2;
    var ingred3 = req.body.ingredient3;
    var ingred4 = req.body.ingredient4;
    var notE = req.body.note;                                

    // Set our collection
    var collection = db.get('recipecollection');

    // Submit to the DB
    collection.insert({
        "name" : recipeName,
        "ingredient" : [ingred1, ingred2, ingred3, ingred4],
        "note": notE,
        "type" : type
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, forward to success page
            res.redirect("recipes");
            // And set the header so the address bar doesn't still say /addrecipe
            res.location("recipes");
        }
    });

}
}