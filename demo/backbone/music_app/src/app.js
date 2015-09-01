/****************************************************
* author：  hualei
* time：    2012/12/17 16:59:48
* fileName：app.js
*****************************************************/

// 获取依赖
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
//var Player = require('../../music_player/src/music_player')
var Router = require('./router');

function app() {
    //new Player();
    var router = new Router();
    Backbone.history.start();
}

app();