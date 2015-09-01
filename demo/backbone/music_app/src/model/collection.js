/****************************************************
* author：  hualei
* time：    2012/12/20 18:45:9
* fileName：collection.js
*****************************************************/

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Music = require('./model');

    var List = Backbone.Collection.extend({
        model: Music,
        //url: 'data/list.json',
         fetch: function () {
             //console.log("i will fetch");
             var self = this;
             var tmpContact;
             $.ajax({
                 url: 'data/list.json',
                 type: "GET",
                 dataType: "json",
                 error: function () { alert("error"); },
                 success: function (data) {
                     $.each(data, function (i, item) {
                         tmpContact = new Music({ id: item.id, name: item.name });
                         self.add(tmpContact);
                     });
                     self.trigger("fetchCompleted:allMusics");
                 }
             });  
         }
    });

    return List;