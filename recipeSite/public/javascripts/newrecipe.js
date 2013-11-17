

$(document).ready(function() {

	var socket = io.connect('http://localhost:3000');

$('#button').click(function(e){
	console.log("works");
	// e.preventDefault();
	// console.log(obj);
	// socket.emit('insertObj', createJSON());
	// socket.on('recipeInserted', function(){
	// 	alert('inserted');
	// });
});


	// $("#foodType").chosen(); 
	// $("#glassType").chosen();

	function createJSON(){
		var obj = {};
		obj['name'] = $('#name').text();
		obj['nameid'] = $('#nameID').text();
		obj['ingredient'] = [
			$('#ingred1').text(),
			$('#ingred2').text(),
			$('#ingred3').text(),
			$('#ingred4').text(),			
			$('#ingred5').text(),
			$('#ingred6').text(),
			$('#ingred7').text(),
			$('#ingred8').text()
		];
		obj['note'] = [
			$('#note1').text(),
			$('#note2').text(),
			$('#note3').text(),
			$('#note4').text(),
			$('#note5').text(),
			$('#note6').text()
		];
		odj['garnish'] = $('#garnish').text();
		obj['foodType'] = $('#recipeType').text();
		obj['glassType'] = $('#glassType').text();
		return obj;
	}



}); 