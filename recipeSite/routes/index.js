
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//For adding new data (posts)
exports.newrecipe = function(req, res){
  res.render('newrecipe', { title: 'Add New Recipe' });
};

//KEEPING FOR REFERENCE WHILE REDOING LOAD DATA IN APP.JS
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