

$(document).ready(function() {

	var socket = io.connect('http://localhost:3000');

$('#button').click(function(e){
	e.preventDefault();
	// console.log(obj);
	socket.emit('insertObj', createJSON());
	socket.on('recipeInserted', function(){
		alert('inserted');
	});
});


	// $("#foodType").chosen(); 
	// $("#glassType").chosen();

	function createJSON(){
		var obj = {};
		obj['name'] = $('#name').val();
		obj['nameid'] = $('#nameID').val();
		obj['ingredient'] = [
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