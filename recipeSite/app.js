
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

app.post('/addrecipe', insert); //adding the the db

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

	// var recipeSchema = new mongoose.Schema({
	//   name: String,
	//   glass: String,
	//   garnish: String,
	//   type: String,
	//   ingredient: {type:Array},
	//   note: {type:Array}
	// });

	// Drinks = mongoose.model('Drinks', recipeSchema);
	// Drinks.find(function(err, recipe){
	// 	if(err) console.log("ERROR!!");
	// 	console.log(recipe);
	// 	var twentieth = new Drinks({name: '20th Century'});
	// 	res.render('recipelist', {
	//        drinks_data: recipe,
	//        foods_data: recipe,
	//        recipe_one: twentieth
	//     });
	// });
// require('models.js').initialize();


  // Recipes.find({}).exec(function(err, result) { 
  //   if (!err) { 
  //     // res.write(html1 + JSON.stringify(result, undefined, 2) +  html2 + result.length + html3);
  //     // Let's see if there are any senior citizens (older than 64) with the last name Doe using the query constructor
  //     var query = Recipes.find({'type': 'cocktail'}); // (ok in this example, it's all entries)

  //     // query.where('age').gt(64);
  //     query.exec(function(err, cocktail) {
		// if (!err) {
		// 	res.render('recipelist', { //pass on data
		//         drinks_data : cocktail});
		//         console.log(cocktail);
		//   // res.end(html4 + JSON.stringify(result, undefined, 2) + html5 + result.length + html6);
		// } else {
		//   res.end('Error in second query. ' + err)
		// }
  //     });
  //   } else {
  //     res.end('Error in first query. ' + err)
  //   };
  // });
// if(req.params.key == null){
// 	Drinks.find({}, function (err, result) {
// 	  if(err) {/*error!!!*/}
// 		var query = Drinks.find({'type': 'cocktail'});
// 		query.exec(function(err, cocktail) {
// 		  if(err) {/*error!!!*/}
// 		  var foodquery = Drinks.find({'type': 'food'});
// 			foodquery.exec(function(err, food) {
// 		    if(err) {/*error!!!*/}
// 			    var onequery = Drinks.find({'nameid': '20thCentury'});
// 				onequery.exec(function(err, oneDrink) {
// 			    if(err) {/*error!!!*/}
// 			    res.render('recipelist', {
// 			       drinks_data: cocktail,
// 			       foods_data: food,
// 			       recipe_one: oneDrink
// 			    });
// 			});
// 		  });
// 		});
// 	});
// 	} else{
// 	Drinks.find({}, function (err, result) {
// 	  if(err) {/*error!!!*/}
// 		var query1 = Drinks.find({'type': 'cocktail'});
// 		query1.exec(function(err, cocktail) {
// 		  if(err) {/*error!!!*/}
// 		  var foodquery2 = Drinks.find({'type': 'food'});
// 			foodquery2.exec(function(err, food) {
// 		    if(err) {/*error!!!*/}
// 			    var onequery3 = Drinks.find({'nameid': '20thCentury'});
// 				onequery3.exec(function(err, oneDrink) {
// 			    if(err) {/*error!!!*/}
// 			    res.render('recipelist', {
// 			       drinks_data: cocktail,
// 			       foods_data: food,
// 			       recipe_one: oneDrink
// 			    });
// 			});
// 		  });
// 		});
// 	});
// 	}
// }
// var userModel = mongoose.model('users');
// var articleModel = mongoose.model('articles');
// userModel.find({}, function (err, db_users) {
//   if(err) {/*error!!!*/}
//   articleModel.find({}, function (err, db_articles) {
//     if(err) {/*error!!!*/}
//     res.render('profile/profile', {
//        users: db_users,
//        articles: db_articles
//     });
//   });
// });



// app.get('/help', function(req, res){
//   Material.find(function (err, materials){
//     res.render('help', {materials: materials});
//   });
// });

    var drinks;
    var oneDrink;
    var foods;
    var oneFood;
	if(req.params.key == null){
		db.Drinks.find({type: "cocktail"}, function(err, Drinks){
			if(err || !Drinks.length) console.log("User not found.");
			else Drinks.forEach(function(designer){
			drinks = Drinks;
			console.log(drinks);

				db.Drinks.find({type: "food"}, function(err, Food){
					if(err || !Food.length) console.log("User not found.");
					else Food.forEach(function(des){
					foods = Food;
					console.log(foods);

						db.Drinks.find({nameid: "20thCentury"}, function(err, drink){
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

// function addRecipe (req, res){

//     // return function(req, res) {

//     // // Get our form values. These rely on the "name" attributes
//     // //<TODO> add dynamic values
//     // //<TODO> add Prep time, cooking time, and servings to food
//     // var recipeName = req.body.recipename;
//     // var type = req.body.typeOfRecipe;
//     // var ingred1 = req.body.ingredient1;
//     // var ingred2 = req.body.ingredient2;
//     // var ingred3 = req.body.ingredient3;
//     // var ingred4 = req.body.ingredient4;
//     // var notE = req.body.note;                                

//     // // Set our collection
//     // var collection = db.get('recipecollection');

//     // // Submit to the DB
//     // collection.insert({
//     //     "name" : recipeName,
//     //     "ingredient" : [ingred1, ingred2, ingred3, ingred4],
//     //     "note": notE,
//     //     "type" : type
//     // }, function (err, doc) {
//     //     if (err) {
//     //         // If it failed, return error
//     //         res.send("There was a problem adding the information to the database.");
//     //     }
//     //     else {
//     //         // If it worked, forward to success page
//     //         res.redirect("recipes");
//     //         // And set the header so the address bar doesn't still say /addrecipe
//     //         res.location("recipes");
//     //     }
//     // });

// }