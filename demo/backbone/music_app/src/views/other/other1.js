/****************************************************
* author：  hualei
* time：    2012/12/21 10:48:51
* fileName：other.js
*****************************************************/


    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    // 
    var otherViewTemplate = '<!--ptpl-text!./otherView1.html--><div class="home"><p>其他视图1111111111。。。</p></div>';


    var otherView1 = Backbone.View.extend({
        //template: _.template(otherViewTemplate),

        el: '.bd',
        render: function () {
            //$(this.el).append(this.template());
            this.html = otherViewTemplate;
            return this;
        }
    });
    return otherView1;
