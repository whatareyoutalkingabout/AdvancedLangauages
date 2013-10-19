
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//passes data to reciplist.jade
// exports.recipelist = function(db) {
//     return function(req, res) {
//         var collection = db.get('recipecollection'); //sets the DB collection
//         collection.find({},{},function(e,docs){ //query DB
//             res.render('recipelist', { //pass on data
//                 "recipelist" : docs
//             });
//         });
//     };
// };

// exports.myrecipe = function(db){
//         var mychoice  = 'Fried PB&B';

//         collection.find({"name":mychoice},{},function(e,myrec){ //query DB
//             onerecipe = myrec;
//         });
//         return function(req, res) {     
//         res.render('myrecipe', { //pass on data
//         "my_recipe": myrec
//         });
// }

//passes data to reciplist.jade
// exports.recipelist = function(req, res) {
    
//         var collection = db.get('recipecollection'); //sets the DB collection
//         var drinks;
//         var foods;
//         var choice  = '20th Century';
//         var key = req;
//         console.log(key.params);
//         //var qs = new Querystring();
//         //var key = qs.get("key");
//         var test = choice;
//         // var byName = $.getUrlVar('name');
//         collection.find({"type":"cocktail"},{},function(e,drink){ //query DB
//             drinks = drink;
//         });
//         collection.find({"type":"food"},{},function(e,food){ //query DB
//             foods = food;
//         }); 
//         collection.find({"name": test},{},function(e,drinkItem){ //query DB
//             oneDrink = drinkItem;
//         });
//         collection.find({"name":"Fried PB&B"},{},function(e,foodItem){ //query DB
//             oneFood = foodItem;
//         }); 
//         // collection.find({mychoice},{},function(e,myrec){ //query DB
//         //     onerecipe = myrec;
//         // });                        
//         console.log(drinks);
//         console.log(foods);   
//         return function(req, res) {     
//         res.render('recipelist', { //pass on data
//         "drinks_data" : drinks,
//         "foods_data" : foods,
//         "drink_one": oneDrink,
//         "food_one": oneFood,
//         // "my_recipe": myrec
//         });
//     };
// };

                // each direction in drink.note      
                //   div#recipeDiv
                //     = direction

//For adding new data (posts)
exports.newrecipe = function(req, res){
  res.render('newrecipe', { title: 'Add New Recipe' });
};

//For adding new data (posts)
// exports.addrecipe = function(db) {
//     return function(req, res) {

//         // Get our form values. These rely on the "name" attributes
//         //<TODO> add dynamic values
//         //<TODO> add Prep time, cooking time, and servings to food
//         var recipeName = req.body.recipename;
//         var type = req.body.typeOfRecipe;
//         var ingred1 = req.body.ingredient1;
//         var ingred2 = req.body.ingredient2;
//         var ingred3 = req.body.ingredient3;
//         var ingred4 = req.body.ingredient4;
//         var notE = req.body.note;                                

//         // Set our collection
//         var collection = db.get('recipecollection');

//         // Submit to the DB
//         collection.insert({
//             "name" : recipeName,
//             "ingredient" : [ingred1, ingred2, ingred3, ingred4],
//             "note": notE,
//             "type" : type
//         }, function (err, doc) {
//             if (err) {
//                 // If it failed, return error
//                 res.send("There was a problem adding the information to the database.");
//             }
//             else {
//                 // If it worked, forward to success page
//                 res.redirect("recipes");
//                 // And set the header so the address bar doesn't still say /addrecipe
//                 res.location("recipes");
//             }
//         });

//     }
// }