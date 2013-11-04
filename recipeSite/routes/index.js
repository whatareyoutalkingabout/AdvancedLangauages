
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

// module.exports = function(includeFile){
//     return require('./'+includeFile);
// };
//KEEPING FOR REFERENCE WHILE REDOING LOAD DATA IN APP.JS
//For adding new data (posts)
exports.addrecipe = function(db) {
    return function(req, res) {

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

        // // Get our form values. These rely on the "name" attributes
        // //<TODO> add dynamic values
        // //<TODO> add Prep time, cooking time, and servings to food
        // var recipeName = req.body.recipename;
        // var type = req.body.typeOfRecipe;
        // var ingred1 = req.body.ingredient1;
        // var ingred2 = req.body.ingredient2;
        // var ingred3 = req.body.ingredient3;
        // var ingred4 = req.body.ingredient4;
        // var notE = req.body.note;                                

        // // Set our collection
        // var collection = db.get('recipecollection');

        // // Submit to the DB
        // collection.insert({
        //     "name" : recipeName,
        //     "ingredient" : [ingred1, ingred2, ingred3, ingred4],
        //     "note": notE,
        //     "type" : type
        // }, function (err, doc) {
        //     if (err) {
        //         // If it failed, return error
        //         res.send("There was a problem adding the information to the database.");
        //     }
        //     else {
        //         // If it worked, forward to success page
        //         res.redirect("recipes");
        //         // And set the header so the address bar doesn't still say /addrecipe
        //         res.location("recipes");
        //     }
        // });

    }
}