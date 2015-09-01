'use strict';

var $ = require('jquery');
var es = require('event-simulate');

$('div.view-signin input[name=email]').attr('value', 'yifeng.ryf@alibaba-inc.com');
$('div.view-signin input[name=password]').attr('value','totorofn123');
es.simulate($('div.view-signin button.sign-button'),'click');
