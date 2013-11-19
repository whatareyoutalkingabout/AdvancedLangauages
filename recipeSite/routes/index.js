
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.recipelist = function(req, res){
  res.render('recipelist', { title: 'Express' });
};

//For adding new data (posts)
exports.newrecipe = function(db, io){
  // res.render('newrecipe', { title: 'Add New Thingy' });
    var drinks;
    var oneDrink;
    var foods;
    var oneFood;
    var nullKey = null;
    var query;

    //Setting req.param.key to a string if not already done.
     // if( req.params.key == nullKey ){
     //     query = "20thCentury";
     // } else {
     //     query = req.params.key;
     // }
    //  db.Drinks.find({type: "cocktail" }, function(err, Drinks){
    //      if(err || !Drinks.length) console.log("User not found.");
    //      else Drinks.forEach(function(designer){
    //      drinks = Drinks;
    //     console.log(drinks);
    //     });
    // });

    // db.Drinks.find({type: "food"}, function(err, Food){
    //     if(err || !Food.length) console.log("User not found.");
    //     else Food.forEach(function(des){
    //     foods = Food;
    //     console.log(foods);    
    //     });
    // });
    // db.Drinks.find({nameid: query}, function(err, drink){
    //     if(err) console.log(err);
    //     else { 
    //     oneDrink = drink;  
    //     console.log(oneDrink);
    //     // res.render('recipelist', { //pass on data
    //     // "drinks_data" : drinks,
    //     // "foods_data" : foods,
    //     // "recipe_one": oneDrink
    //     // });
    //     }
    // });

    io.sockets.on('connection', function(socket){
        socket.on('insertObj', function(data){
            console.log(data);
            db.Drinks.insert(data, {safe:true}, function(err, doc){
                socket.emit('recipeInserted');
            });

            /*
            db.Drinks.find({}, function(err, db_drink_type){
                if( err || !db_drink_type)
                    console.log("No Drink Type found");
                else {
                    socket.emit('setDrinkType', db_drink_type);
                }
            });*/
        });

        socket.on('getCocktailList', function(){
            db.Drinks.find({type: 'cocktail'},{name: 1, nameid: 1}, function(err, cocktails){
                if(err) console.log("User not found.");
                else {
                    // Drinks.forEach(function(designer){
                    // drinkList = cocktails;
                    socket.emit('setCocktailList', cocktails);
                    // console.log(cocktails);
                }
            });
        });

        socket.on('getFoodList', function(){
            db.Drinks.find({type: 'food'},{name: 1, nameid: 1}, function(err, foods){
                if(err) console.log("food not found.");
                else {
                    // Drinks.forEach(function(designer){
                    // drinkList = cocktails;
                    socket.emit('setFoodList', foods);
                    // console.log(cocktails);
                }
            });
        }); 

        socket.on('getList', function(){
            db.Drinks.find({},{name: 1, nameid: 1}, function(err, list){
                if(err) console.log("food not found.");
                else {
                    // Drinks.forEach(function(designer){
                    // drinkList = cocktails;
                    socket.emit('setList', list);
                    // console.log(list);
                }
            });
        });                

        socket.on('getRecipe', function(data){
            db.Drinks.find({nameid: data},{}, function(err, recipe){
                if(err) console.log("wa wa");
                else{
                    socket.emit('setRecipe', recipe[0]);
                    // console.log(recipe);
                }
            });
        });

     }); 
    return function(req, res){
        res.render('newrecipe', {drinks_data: drinks, foods_data: foods, recipe_one: oneDrink });
    };
};

// module.exports = function(includeFile){
//     return require('./'+includeFile);
// };
//KEEPING FOR REFERENCE WHILE REDOING LOAD DATA IN APP.JS
//For adding new data (posts)
// exports.addrecipe = function(db) {
//     return function(req, res) {

//         var recipeName = req.body.recipename;
//         var id = req.body.nameid;
//         var type = req.body.typeOfRecipe;
//         var glassType = req.body.typeOfglass;
//         var ingred1 = req.body.ingredient1;
//         var ingred2 = req.body.ingredient2;
//         var ingred3 = req.body.ingredient3;
//         var ingred4 = req.body.ingredient4;
//         var ingred5 = req.body.ingredient5;
//         var ingred6 = req.body.ingredient6;
//         var ingred7 = req.body.ingredient7;
//         var ingred8 = req.body.ingredient8; 
//         var garnsh = req.body.garnish;       
//         var direction1 = req.body.note1;
//         var direction2 = req.body.note2;
//         var direction3 = req.body.note3;
//         var direction4 = req.body.note4;
//         var direction5 = req.body.note5;
//         var direction6 = req.body.note6;                                

//     db.Drinks.save({            
//         "name" : recipeName,
//         "nameid": id,
//         "type" : type,
//         "glass" : glassType,
//         "ingredient" : [ingred1, ingred2, ingred3, ingred4, ingred5, ingred6, ingred7, ingred8],
//         "garnish": garnsh, 
//         "note": [direction1, direction2, direction3, direction4, direction5, direction6]

//         }, function(err, saved) {
//         if( err || !saved ) console.log("User not saved");
//         else {
//             // If it worked, forward to success page
//             res.redirect("recipes");
//             // And set the header so the address bar doesn't still say /addrecipe
//             res.location("recipes");
//             console.log("User saved");
//             }
//         });

//         // // Get our form values. These rely on the "name" attributes
//         // //<TODO> add dynamic values
//         // //<TODO> add Prep time, cooking time, and servings to food
//         // var recipeName = req.body.recipename;
//         // var type = req.body.typeOfRecipe;
//         // var ingred1 = req.body.ingredient1;
//         // var ingred2 = req.body.ingredient2;
//         // var ingred3 = req.body.ingredient3;
//         // var ingred4 = req.body.ingredient4;
//         // var notE = req.body.note;                                

//         // // Set our collection
//         // var collection = db.get('recipecollection');

//         // // Submit to the DB
//         // collection.insert({
//         //     "name" : recipeName,
//         //     "ingredient" : [ingred1, ingred2, ingred3, ingred4],
//         //     "note": notE,
//         //     "type" : type
//         // }, function (err, doc) {
//         //     if (err) {
//         //         // If it failed, return error
//         //         res.send("There was a problem adding the information to the database.");
//         //     }
//         //     else {
//         //         // If it worked, forward to success page
//         //         res.redirect("recipes");
//         //         // And set the header so the address bar doesn't still say /addrecipe
//         //         res.location("recipes");
//         //     }
//         // });

//     }
// }