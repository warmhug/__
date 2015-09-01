/****************************************************
* author：  hualei
* time：    2012/12/21 10:48:51
* fileName：other.js
*****************************************************/


    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    // 
    var otherViewTemplate = '<!--ptpl-text!./otherView.html--><div class="home"><p>其他视图。。。</p><p><a href="#list">音乐列表 &gt;</a></p></div>';


    var otherView = Backbone.View.extend({
        el: '.bd',
        render: function () {
            //$(this.el).append(this.template());
            this.html = otherViewTemplate;
            return this;
        }
    });
    return otherView;
