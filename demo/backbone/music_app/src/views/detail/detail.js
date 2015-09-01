/****************************************************
* author：  hualei
* time：    2012/12/20 19:14:37
* fileName：detail.js
*****************************************************/


    // 获取依赖
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var util = require('../../util');
    // 
    var detailViewTemplate = '<!--ptpl-text!./detailView.html--><div class="player"><div class="info"><span class="name"><%= name %></span><span class="singer">--<%= singer %></span><span class="lrc-btn">歌词</span><audio class="none" src="<%= src %>"></audio></div><div class="ctrl"><span class="c-btn play"></span><span class="proBar"><b></b></span><span class="time"></span></div><div class="lrc none"><div class="lrc-text"><%= lrc %></div></div></div>';


    var detailView = Backbone.View.extend({

        template: _.template(detailViewTemplate),

        initialize: function () {

            this.model.bind('fetchCompleted:oneMusic', this.render, this);
        },
        el: '.bd',
        render: function () {
            //console.log("model=" + this.model.toJSON());
            //$(this.el).append(this.template(this.model.toJSON()));

            var playerEle = $('.player-box');
            playerEle.removeClass('none'); 
            playerEle.html(this.template(this.model.toJSON()));

            //this.trigger("renderCompleted:detail", this, "this is detail view");
            this.music_player();
            return this;
        },

        music_player: function () {
            var that = this;

            var $contain = $('.player');
            that.audioEle = $contain.find('audio');
            that.ctrlBtn = $contain.find('.c-btn');
            that.proBar = $contain.find('.proBar');
            that.timeEle = $contain.find('.time');

            var ctrlBar = that.ctrlBar = that.proBar.find('b');
            var proBarW = that.proBarW = that.proBar.width() - 2;

            // time transfer
            var time = function (s) {
                var min, sec, om = parseInt(s / 60), rs = Math.round(s % 60);
                min = om < 10 ? '0' + om : om;
                sec = rs < 10 ? '0' + rs : rs;
                return {
                    'show': min + ':' + sec,
                    'ts': parseInt(Math.round(s))
                };
            }

            var timer; // 定时器
            var play = function () {
                that.audioEle[0].play();
                timer = setInterval(function () {
                    timeEle(parseInt(that.timeEle.attr('time')) - 1);
                }, 1000);
                that.ctrlBtn.removeClass('play').addClass('pause');
                if (that.lrcTxt.hasClass('haveloaded')) change(that.lrcObj);
            }
            var pause = function () {
                that.audioEle[0].pause();
                clearInterval(timer);
                that.ctrlBtn.removeClass('pause').addClass('play');
            }
            var timeEle = function (t) {
                var tobj = time(t);
                that.timeEle.text(tobj.show);
                that.timeEle.attr('time', tobj.ts);
                if (tobj.ts <= 0) clearInterval(timer);
            }

            // audio events
            this.audioEle.on('durationchange', function (e) {
                that.dtime = that.audioEle.attr('duration');
                if (!isNaN(that.dtime)) {
                    timeEle(that.dtime);
                }
            });
            this.audioEle.on('canplay', function (e) {
                // ctrlBtn events
                that.ctrlBtn.on('click', function (e) {
                    if (that.ctrlBtn.hasClass('play')) {
                        play();
                    } else {
                        pause();
                    }
                }).trigger('click');
            });
            this.audioEle.on('ended', function (e) {
                that.ctrlBtn.removeClass('pause').addClass('play');
                that.timeEle.attr('time', Math.round(that.dtime));
                clearInterval(timer);
            });
            this.audioEle.on('timeupdate', function (e) {
                var curTime = that.audioEle.attr('currentTime');
                // console.log(curTime);
                // change progressBar display
                ctrlBar.css({
                    'left': parseInt(proBarW * curTime / that.dtime)
                });
            });


            // progressBar event
            this.proBar.on('click', function (e) {
                var pos = e.offsetX * that.dtime / proBarW;
                that.audioEle[0].currentTime = pos;
                timeEle(that.dtime - pos);
                clearInterval(timer);
                play();
                ctrlBar.css({
                    'left': e.offsetX
                });
                if (that.lrcTxt.hasClass('haveloaded')) change(that.lrcObj);
            });

            // lrc ctrl
            this.lrcEle = $contain.find('.lrc');
            this.lrcBtn = $contain.find('.lrc-btn');
            this.lrcTxt = $contain.find('.lrc-text');
            var step;
            this.lrcBtn.on('click', function (e) {
                that.lrcEle.toggle();

                !that.lrcTxt.hasClass('haveloaded') &&
				$.ajax({
				    url: that.lrcTxt.text(),
				    type: "GET",
				    dataType: "text",
				    error: function () { alert('找不到歌词'); },
				    success: function (json) {
				        that.lrcTxt.addClass('haveloaded');
				        var obj = that.lrcObj = parse(json);
				        that.lrcTxt.html(obj.htmArr.join(''));
				        step = parseInt(that.lrcTxt.find('p').height());
				        change(obj, true);
				    }
				});



            });

            var index;
            var change = function (lrcObj, first) {
                var obj = lrcObj;
                var curTime = parseFloat(that.audioEle.attr('currentTime'));
                var len = obj.timeArr.length;
                if (!isNaN(curTime)) {
                    if (curTime >= obj.timeArr[len - 1]) {
                        that.lrcTxt.css({ 'top': -(len - 1) * step });
                        that.lrcTxt.find('p').removeClass('cur');
                        that.lrcTxt.find('p').eq(len).addClass('cur');
                        return;
                    }
                    for (var i = 0; i < len - 1; i++) {
                        if (curTime >= obj.timeArr[i] && curTime < obj.timeArr[i + 1]) {
                            that.lrcTxt.css({ 'top': -(i - 1) * step });
                            that.lrcTxt.find('p').removeClass('cur');
                            that.lrcTxt.find('p').eq(i).addClass('cur');
                            index = i;
                        }
                    }
                }
                //console.log(index);
                var handler = function (e) {
                    var curTime = that.audioEle.attr('currentTime');
                    //console.log(index);
                    if (index < len) {
                        if (curTime >= obj.timeArr[len - 1]) {
                            that.lrcTxt.css({ 'top': -(len - 1) * step });
                            that.lrcTxt.find('p').removeClass('cur');
                            that.lrcTxt.find('p').eq(len).addClass('cur');
                            return;
                        }
                        if (curTime > obj.timeArr[index] && curTime < obj.timeArr[index + 1]) {
                            that.lrcTxt.css({ 'top': -(index - 1) * step });
                            that.lrcTxt.find('p').removeClass('cur');
                            that.lrcTxt.find('p').eq(index).addClass('cur');
                            index += 1;
                        }
                    }
                };
                first && that.audioEle.on('timeupdate', handler);
            }

            var parse = function (str) {
                var timeArr = [], htmArr = [], preArr = [], items = [], tArr = [];
                str = str.replace(/\n/g, '');
                preArr = str.split('[');
                for (var i = 0; i < preArr.length; i++) {
                    items = preArr[i].split(']');
                    if (items.length == 2) {
                        tArr = items[0].split(':');
                        if (tArr.length == 2) {
                            var t = 60 * parseInt(tArr[0]) + parseFloat(tArr[1]);
                            timeArr.push(t);
                        }
                        htmArr.push('<p>' + items[1] + '</p>');
                    }
                }
                return {
                    'timeArr': timeArr,
                    'htmArr': htmArr
                }
            }
        }


    });

    return detailView;


