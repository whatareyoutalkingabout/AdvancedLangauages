  $(document).ready(function(){
    $('.carousel').carousel();
  });

$.extend({

  getUrlVars: function(){

    var vars = [], hash;

    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++)

    {

      hash = hashes[i].split('=');

      vars.push(hash[0]);

      vars[hash[0]] = hash[1];

    }

    return vars;

  },

  getUrlVar: function(name){

    return $.getUrlVars()[name];

  }

});

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