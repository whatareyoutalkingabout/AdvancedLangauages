

$(document).ready(function() {

	var socket = io.connect('http://localhost:3000'); //gives socket.io access to watch

//when button clicked the json object is
//sent to index.js to be inserted into the database.
//socket.on recieves confirmation the recipe
//was inserted and displays confirmation box
$('#button').click(function(e){ //loads fields onto modal
	e.preventDefault();
          $("#confirmRecipe").html("<p class='text-large-ul text-center'>"
            + "Name: " + $('#name').val() + "</p>"
            +"<p>Garnish: " + $('#garnish').val() + "</p>"
            +"<p>Type of recipe: " + $('#foodType').val() + "</p>"
            +"<p>Glass type: " + $('#glassType').val() + "</p>"
            + "<p>" + "Ingredients" + "</p>"
            + "<ul><li>" + $('#ingred1').val() + "</li>"
            + "<li>" + $('#ingred1').val() + "</li>"
            + "<li>" + $('#ingred2').val() + "</li>"
            + "<li>" + $('#ingred3').val() + "</li>"
            + "<li>" + $('#ingred4').val() + "</li>"
            + "<li>" + $('#ingred5').val() + "</li>"
            + "<li>" + $('#ingred6').val() + "</li>"
            + "<li>" + $('#ingred7').val() + "</li></ul>"
			+ "<ol><li>" + $('#note1').val() + "</li>"
			+ "<li>" + $('#note2').val() + "</li>"
			+ "<li>" + $('#note3').val() + "</li>"
			+ "<li>" + $('#note4').val() + "</li>"
			+ "<li>" + $('#note5').val() + "</li>"
			+ "<li>" + $('#note6').val() + "</li></ol>"
            );

	$('#modalConfirm').modal('show');		
});

$('#button-cancel').click(function(){
    $('#form').find("input, textarea").val("");
});

$('#insert-yes').click(function(e){
	e.preventDefault();
	socket.emit('insertObj', createJSON()); //sends createJSON variable as insertObj
	socket.on('recipeInserted', function(){	//when response recieved hides modal and clears fields
	$('#modalConfirm').modal('hide');
	$('#form').find("input, textarea").val("");
	});
});

	function createJSON(){
		var obj = {};
		obj['name'] = $('#name').val();
		obj['nameid'] = $('#nameID').val();
		obj['ingredient'] = [
			// if($('#ingred1').val() != ""){
			// 	$('#ingred1').val()
			// }
			// if($('#ingred2').val() != ""){
			// 	,$('#ingred2').val()
			// }			
			// if($('#ingred3').val() != ""){
			// 	,$('#ingred3').val()
			// }
			// if($('#ingred4').val() != ""){
			// 	,$('#ingred4').val()
			// }
			// if($('#ingred5').val() != ""){
			// 	,$('#ingred5').val()
			// }
			// if($('#ingred6').val() != ""){
			// 	,$('#ingred6').val()
			// }
			// if($('#ingred7').val() != ""){
			// 	,$('#ingred7').val()
			// }
			// if($('#ingred8').val() != ""){
			// 	,$('#ingred8').val()
			// }
			$('#ingred1').val(),
			$('#ingred2').val(),
			$('#ingred3').val(),
			$('#ingred4').val(),			
			$('#ingred5').val(),
			$('#ingred6').val(),
			$('#ingred7').val(),
			$('#ingred8').val()
		];
		obj['note'] = [
			$('#note1').val(),
			$('#note2').val(),
			$('#note3').val(),
			$('#note4').val(),
			$('#note5').val(),
			$('#note6').val()
		];
		obj['garnish'] = $('#garnish').val();
		obj['type'] = $('#foodType').val();
		obj['glass'] = $('#glassType').val();
		return obj;
	}



}); 