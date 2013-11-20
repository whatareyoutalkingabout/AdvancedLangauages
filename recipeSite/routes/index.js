
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


    io.sockets.on('connection', function(socket){ //
        socket.on('insertObj', function(data){ //receive object and load in data
            // console.log(data);
            db.Drinks.insert(data, {safe:true}, function(err, doc){ //inset into database
                socket.emit('recipeInserted'); //returns response
            });
        });

        socket.on('getCocktailList', function(){
            db.Drinks.find({type: 'cocktail'},{name: 1, nameid: 1}, function(err, cocktails){
                if(err) console.log("User not found.");
                else {
                    socket.emit('setCocktailList', cocktails);
                    // console.log(cocktails);
                }
            });
        });

        socket.on('getFoodList', function(){
            db.Drinks.find({type: 'food'},{name: 1, nameid: 1}, function(err, foods){
                if(err) console.log("food not found.");
                else {
                    socket.emit('setFoodList', foods);
                    // console.log(cocktails);
                }
            });
        }); 

        socket.on('getList', function(){
            db.Drinks.find({},{name: 1, nameid: 1}, function(err, list){
                if(err) console.log("food not found.");
                else {
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
