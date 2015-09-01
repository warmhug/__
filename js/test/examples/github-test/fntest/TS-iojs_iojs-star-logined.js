'use strict';

var $ = require('jquery');
var expect = require('expect.js');
var es = require('event-simulate');

describe('github项目页-star功能-已登录用户', function () {

  it('点击star，点赞人数+1', function(done){
    // 获取点赞人数
    var starNum = parseInt($('form.unstarred a').text().replace(',',''));
    // 模拟点击事件
    es.simulate($('form.unstarred button'), 'click');
    // 等待动画完成
    setTimeout(function(){
      expect($('form.starred').is(':visible')).to.be(true);
      expect(parseInt($('form.unstarred a').text().replace(',',''))).to.be(starNum+1);
      done();
    },1000);
  });

  it('再次点击star，点赞人数-1', function(done){
    // 获取点赞人数
    var starNum = parseInt($('form.starred a').text().replace(',',''));
    // 模拟点击事件
    es.simulate($('form.starred button'), 'click');
    // 等待动画完成
    setTimeout(function(){
      expect($('form.unstarred').is(':visible')).to.be(true);
      expect(parseInt($('form.starred a').text().replace(',',''))).to.be(starNum-1);
      done();
    },1000);
  });

});
