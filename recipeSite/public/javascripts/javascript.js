$(document).ready(function(){
  var socket = io.connect('http://localhost:3000');

  //sets carousel to spin at choosen interval
  $('.carousel').carousel({
    interval: 4000
  });

  //using a jquery pluggin called chosen to display to insert comboboxes
  $("#foodType").chosen({allow_single_deselect: true}); 
  $("#glassType").chosen({allow_single_deselect: true}); 

  $('#cocktailList').click(function(){
    socket.emit('getCocktailList'); //collects data and sends to index
    socket.on('setCocktailList', function(data){ //recienves data from query in index.js
      $("#dropCockails").html("");
      $.each(data, function(i, value){ //loops through data and send html to a div
        $("#dropCockails").append("<li><a id='"+value.nameid+"'>"+ value.name+"</a></li>");
      });
      $('#dropCockails li a').click(function(e){
        e.preventDefault();
        socket.emit('getRecipe',$(this).prop('id')); //collects data and sends it to index.js
        socket.on('setRecipe', function(data){ //recienves data from query in index.js
          $("#recipeDisplay").html("<p class='text-large-ul text-center'>"
            + data.name + "</p>"
            + "<p>" + "Glass type: " + data.glass + "</p>"
             + "<p>" + "Ingredients" + "</p>");
          var unorderedList = $("<ul>"); //sets an unordered list
          $.each(data.ingredient, function(i, value){
            unorderedList.append("<li>"+value+"</li>"); // loops through data and appends it to the list
          });
          $("#recipeDisplay").append(unorderedList);
          $("#recipeDisplay").append("<p>Directions</p>"); // loops through data and appends it to the list
          var orderList = $('<ol>'); //sets an ordered list
          $.each(data.note, function(i, value){
            orderList.append("<li>"+value+"</li>"); // loops through data and appends it to the list
          });
          $("#recipeDisplay").append(orderList); //appends it to the end of recipeDisplay div
        });
      });
    });
  });
  //Same as above
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
        socket.emit('getRecipe',$(this).prop('id'));
        socket.on('setRecipe', function(data){
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

    // var availableTags = [
    //   "ActionScript",
    //   "AppleScript",
    //   "Asp",
    //   "BASIC",
    //   "C",
    //   "C++",
    //   "Clojure",
    //   "COBOL",
    //   "ColdFusion",
    //   "Erlang",
    //   "Fortran",
    //   "Groovy",
    //   "Haskell",
    //   "Java",
    //   "JavaScript",
    //   "Lisp",
    //   "Perl",
    //   "PHP",
    //   "Python",
    //   "Ruby",
    //   "Scala",
    //   "Scheme"
    // ];
    // $( "#tags" ).autocomplete({
    //   source: availableTags
    // });



});
