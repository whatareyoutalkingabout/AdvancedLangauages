

var express = require('express'); //accesses express framework
var routes = require('./routes'); //accesses routes folder
var user = require('./routes/user'); //accesses routes/user
var http = require('http'); //gets http framework
var path = require('path'); //used to set paths
//var mongo = require('mongodb'); 
// var monk = require('monk'); //imports monk (which is used to connect mongoDB)
// var db = monk('localhost:27017/recipecollection'); //use monk to link to db

var collections = ['users'];
// var db = require("mongojs").connect(dburl, collections);

var mongojs = require('mongojs');

// var db = mongojs('irvinetest:irvinetest@ds047438.mongolab.com:47438/styletest', ['Designer']);


//var db2 = monk('localhost:27017/recipecollection'); //use monk to link to db
// var mongojs = require('mongojs');
var db = mongojs('recipetest:recipetest@ds049288.mongolab.com:49288/recipes', ['Drinks']);
// // app.js

// // app.js
// db.Drinks.find({name: "20th Century"}, function(err, users) {
//   if( err || !users) console.log("No female users found");
//   else users.forEach( function(femaleUser) {
//     console.log(femaleUser);
//   } );
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
app.get('/recipes', recipes); //when user navigates to to this route we pass the database object
app.get('/recipes/:key', recipes);
// app.get('/myrecipes/:text'routes.myrecipes(request.params.text));
//app.get('/newrecipe', routes.newrecipe); //for adding a path to newrecipe

//app.post('/addrecipe', routes.addrecipe(db)); //adding the the db

//Creates server and loads express with the above environments set
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function recipes(req, res) {

    var drinks;
    var oneDrink;
	if(req.params.key == null){
		db.Drinks.find({}, function(err, Drinks){
			if(err || !Drinks.length) console.log("User not found.");
			else Drinks.forEach(function(designer){
			console.log("User found! - " + designer.name + ' ' + designer.notes);
			drinks = Drinks;
			console.log("is there anybody home?");

				db.Drinks.find({nameid: "20thCentury"}, function(err, drink){
					if(err) console.log(err);
					else { 
						oneDrink = drink;
						 console.log(oneDrink);    
				        res.render('recipelist', { //pass on data
				        "drinks_data" : drinks,
				        // "foods_data" : foods,
				        "drink_one": oneDrink
				        // "food_one": oneFood,
				        // "my_recipe": myrec
				       	 
				   	    });
					}
				});
		
			});
		});

		// db.Food.find({}, function(err, Food){
		// 	if(err || !Food.length) console.log("User not found.");
		// 	else Food.forEach(function(designer2){
		// 	console.log("User found! - " + designer2.name + ' ' + designer2.notes);
		// 	foods = Food;
		// 	console.log("is there anybody home?");

		// 		db.Food.find({nameid: "CraggyChocolateCake"}, function(err, one_food){
		// 			if(err) console.log(err);
		// 			else { 
		// 				oneFood = one_food;
		// 				 console.log(oneDrink);    
		// 		        res.render('recipelist', { //pass on data
		// 		        // "drinks_data" : drinks,
		// 		        "foods_data" : foods,
		// 		         // "drink_one": oneDrink,
		// 		        "food_one": oneFood,
		// 		        // "my_recipe": myrec
				       	 
		// 		   	    });
		// 			}
		// 		});
		
		// 	});
		// });

	} else{
		db.Drinks.find({}, function(err, Drinks){
			if(err || !Drinks.length) console.log("User not found.");
			else Drinks.forEach(function(designer){
			console.log("User found! - " + designer.name + ' ' + designer.notes);
			drinks = Drinks;
			console.log("is there anybody home?");

				db.Drinks.find({nameid: req.params.key}, function(err, drink){
					if(err) console.log(err);
					else { 
						oneDrink = drink;
						 console.log("Smile");    
				        res.render('recipelist', { //pass on data
				        "drinks_data" : drinks,
				        // "foods_data" : foods,
				         "drink_one": oneDrink
				        // "food_one": oneFood,
				        // "my_recipe": myrec
				       	 
				   	    });
					}
				});
		
			});
		});
	}
}	




    //     var collection = db.get('recipecollection'); //sets the DB collection
    //     var drinks;
    //     var foods;
    //     var choice  = '20th Century';
    //     var key = req;
    //     console.log(collection);
    //     //var qs = new Querystring();
    //     //var key = qs.get("key");
    //     var test = choice;
    //     // var byName = $.getUrlVar('name');
    //     collection.find({"type":"cocktail"},{},function(e,drink){ //query DB
    //         drinks = drink;
    //     });
    //     collection.find({"type":"food"},{},function(e,food){ //query DB
    //         foods = food;
    //     }); 
    //     collection.find({"name": test},{},function(e,drinkItem){ //query DB
    //         oneDrink = drinkItem;
    //     });
    //     collection.find({"name":"Fried PB&B"},{},function(e,foodItem){ //query DB
    //         oneFood = foodItem;
    //     }); 
    //     // collection.find({mychoice},{},function(e,myrec){ //query DB
    //     //     onerecipe = myrec;
    //     // });                        
    //     // console.log(drinks);
    //     // console.log(foods); 