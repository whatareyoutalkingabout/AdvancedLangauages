// module.exports = mongoose.model('Drinks', recipeSchema);

// 	var recipeSchema = new mongoose.Schema({
// 	  name: String,
// 	  glass: String,
// 	  garnish: String,
// 	  type: String,
// 	  ingredient: {type:Array},
// 	  note: {type:Array}
// 	});


var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

module.exports = function() {
    var Drinks = new Schema({
	  name: String,
	  glass: String,
	  garnish: String,
	  type: String,
	  ingredient: {type:Array},
	  note: {type:Array}
    });
    mongoose.model("drinks", Drinks);
};