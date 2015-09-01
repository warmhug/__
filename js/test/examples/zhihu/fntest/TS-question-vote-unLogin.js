'use strict';

var $ = require('jquery');
var expect = require('expect.js');
var es = require('event-simulate');

describe('知乎问题页-投票功能-未登录用户', function () {

  /**
   * @操作步骤
   *   鼠标点击投票区域
   * @预期结果
   *   弹出注册框
   */
  it('正确弹出登录框', function (done) {
    es.simulate($('div.zm-votebar button.up'),'click');
    setTimeout(function(){
      expect($('div.sign-dialog').is(':visible')).to.be(true);
      done();
    },1000)
  });
});
