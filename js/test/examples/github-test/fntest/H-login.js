'use strict';

var $ = require('jquery');
var es = require('event-simulate');

$('#login_field').attr('value','totorofn');
$('#password').attr('value','totorofn123');

$('input[type=submit]').click();
