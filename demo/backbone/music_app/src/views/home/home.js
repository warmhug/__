/****************************************************
* author：  hualei
* time：    2012/12/21 10:48:51
* fileName：home.js
*****************************************************/


    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var homeViewTemplate = '<!--ptpl-text!./homeView.html--><div class="home"><p>这是个音乐的web app ，使用 backbone 构造，使用seajs管理依赖。</p><p><a href="#list">音乐列表 &gt;</a></p><p><a href="#other">其他 &gt;</a></p></div>';

    function createElement(str) {
        var div = document.createElement('div');
        div.innerHTML = str;
        var container = document.createDocumentFragment();
        for (var i = 0; i < div.childNodes.length; i++) {
            var node = div.childNodes[i].cloneNode(true);
            container.appendChild(node);
        }
        return container.childNodes;
    }

    var mainHomeView = Backbone.View.extend({
        el: '.bd',
        render: function () {
            //$(this.el).append(this.template());
            this.html = homeViewTemplate;
            this.domref = createElement(homeViewTemplate);
            //this.domc = $(this.domref).attr('class','aa');
            return this;
        }
    });
    return mainHomeView;
