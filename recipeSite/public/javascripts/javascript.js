$(document).ready(function(){
  var socket = io.connect('http://localhost:3000');

  $('.carousel').carousel({
    interval: 4000
  });

  $("#foodType").chosen({allow_single_deselect: true}); 
  $("#glassType").chosen(); 

  $('#cocktailList').click(function(){
    socket.emit('getCocktailList');
    socket.on('setCocktailList', function(data){
      $("#dropCockails").html("");
      $.each(data, function(i, value){
        console.log(value);
        $("#dropCockails").append("<li><a id='"+value.nameid+"'>"+ value.name+"</a></li>");
      });
      $('#dropCockails li a').click(function(e){
        e.preventDefault();
        //TODO socket emit with id.
        socket.emit('getRecipe',$(this).prop('id')); //collects data and sends it to index.js
        // alert($(this).prop('id'));
        //TODO RETrEIVE DATA.
        socket.on('setRecipe', function(data){ //recienves data from query in index.js
          // console.log(data);
          $("#recipeDisplay").html("<p class='text-large-ul text-center'>"
            + data.name + "</p>"
            + "<p>" + "Glass type: " + data.glass + "</p>"
             + "<p>" + "Ingredients" + "</p>");
          var unorderedList = $("<ul>");
          $.each(data.ingredient, function(i, value){
            unorderedList.append("<li>"+value+"</li>");
          });
          $("#recipeDisplay").append(unorderedList);
          $("#recipeDisplay").append("<p>Directions</p>");
          var orderList = $('<ol>');
          $.each(data.note, function(i, value){
            orderList.append("<li>"+value+"</li>");
          });
          $("#recipeDisplay").append(orderList);
        });
      });
    });
  });

  $('#foodList').click(function(){
    socket.emit('getFoodList');
    socket.on('setFoodList', function(data){
      $("#dropFood").html("");
      $.each(data, function(i, value){
        console.log(value);
        $("#dropFood").append("<li><a id='"+value.nameid+"'>"+ value.name+"</a></li>");
      });
      $('#dropFood li a').click(function(e){
        e.preventDefault();
        //TODO socket emit with id.
        socket.emit('getRecipe',$(this).prop('id'));
        // alert($(this).prop('id'));
        //TODO RETrEIVE DATA.
        socket.on('setRecipe', function(data){
          // console.log(data);
          $("#recipeDisplay").html("<p class='text-large-ul text-center'>"
            + data.name + "</p>"
            + "<p>" + "Ingredients" + "</p>");
          var unorderedList = $("<ul>");
          $.each(data.ingredient, function(i, value){
            unorderedList.append("<li>"+value+"</li>");
          });
          $("#recipeDisplay").append(unorderedList);
          $("#recipeDisplay").append("<p>Directions</p>");
          var orderList = $('<ol>');
          $.each(data.note, function(i, value){
            orderList.append("<li>"+value+"</li>");
          });
          $("#recipeDisplay").append(orderList);
        });
      });
    });
  });

});



// $.extend({

//   getUrlVars: function(){

//     var vars = [], hash;

//     var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

//     for(var i = 0; i < hashes.length; i++)

//     {

//       hash = hashes[i].split('=');

//       vars.push(hash[0]);

//       vars[hash[0]] = hash[1];

//     }

//     return vars;

//   },

//   getUrlVar: function(name){

//     return $.getUrlVars()[name];

//   }

// });

// // Get object of URL parameters

// var allVars = $.getUrlVars();

// // Getting URL var by its name

// var byName = $.getUrlVar('name');

 //   var values = {},
 //  pairs = window.location.hash.substring(1).split('&'),
 //  pair;
 // for (var i = 0, len = pairs.length; i < len; i++) {
 //  pair = pairs[i].split('=');
 //  values[pair[0]] = pair[1];
 // }
 // alert(values['key']);

