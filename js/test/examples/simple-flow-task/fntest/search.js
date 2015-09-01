var $ = require('jquery');
var es = require('event-simulate');
var textInput = $('#J_searchIpt');

textInput.val('小米手机4');
setTimeout(function() {
  es.simulate($('.i.search'), 'click');
}, 200);
