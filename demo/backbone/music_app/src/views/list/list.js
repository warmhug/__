/****************************************************
* author：  hualei
* time：    2012/12/20 19:15:37
* fileName：list.js
*****************************************************/


    // 获取依赖
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    // -
    var listViewTemplate = '<!--ptpl-text!./listView.html--><div class="lists"><ul><% for (var i = 0; i < data.length; i++) { %><% var item = data[i]; %><li><a href="#detail/<%=item.name%>/<%= item.id%>"><%= item.name %></a></li><% } %></ul><p><a href="#other1">其他视图1 &gt;</a></p></div>';

    var listView = Backbone.View.extend({

        template: _.template(listViewTemplate),

        initialize: function () {
            this.collection.bind('fetchCompleted:allMusics', this.render, this);
        },
        el: '.bd',
        render: function () {
            //$(this.el).append(this.template({ data: this.collection.toJSON() }));
            console.log(this.template);
            this.html = this.template({ data: this.collection.toJSON() });
            this.trigger("renderCompleted:list", this, "this is list view");
            return this;
        }
    });

    return listView;



