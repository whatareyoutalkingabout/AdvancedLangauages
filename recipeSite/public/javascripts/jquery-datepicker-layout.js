
function jqueryDatePicker (id){
	$( id ).datepicker({
		 dateFormat:"yy-mm-dd",
		 changeMonth: true,
		 changeYear: true,
		 maxDate: "0D",
	     showOn: "button",
		 buttonImage: "/MTDS/images/calendarBlue.gif",
	     buttonImageOnly: true
	 });
}

//French Language conversion for datePicker If uncommented it makes french 
//the default language
//Datepicker
	if(currentLanguage == "fr"){
	jQuery(function($){
	        $.datepicker.regional['fr'] = {
	                closeText: 'Fermer',
	                prevText: '&#x3c;Préc',
	                nextText: 'Suiv&#x3e;',
	                currentText: 'Courant',
	                monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
	                'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
	                monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
	                'Jul','Aoû','Sep','Oct','Nov','Déc'],
	                dayNames:
	['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
	                dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
	                dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
	                weekHeader: 'Sm',
	                dateFormat: 'dd/mm/yy',
	                firstDay: 1,
	                isRTL: false,
	                showMonthAfterYear: false,
	                yearSuffix: ''};
	        $.datepicker.setDefaults($.datepicker.regional['fr']);
	}); 
	}