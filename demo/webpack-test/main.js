var b = require('./b');
require('./main.css');
module.exports= function(){
	require(['./c'],function(c){
		console.log(b+c);
	});	
}();