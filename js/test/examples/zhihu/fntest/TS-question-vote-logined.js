'use strict';

var $ = require('jquery');
var expect = require('expect.js');
var es = require('event-simulate');

describe('知乎问题页-投票功能-已登录用户', function () {

  /**
   * @操作步骤
   *   点击赞同按钮
   * @预期结果
   *   赞同人数+1
   */
  it('正确增加赞同人数', function (done) {
    // 已赞同人数
    var count = Number($('button.up span.count').eq(0).text());
    es.simulate($('button.up').eq(0),'click');
    setTimeout(function(){
      expect(Number($('button.up span.count').eq(0).text())).to.be(count+1);
      done();
    },500)
  });

  /**
   * @操作步骤
   *   再次点击赞同按钮
   * @预期结果
   *   赞同人数-1
   */
  it('正确减少赞同人数', function (done) {
    // 已赞同人数
    var count = Number($('button.up span.count').eq(0).text());
    es.simulate($('button.up').eq(0),'click');
    setTimeout(function(){
      expect(Number($('button.up span.count').eq(0).text())).to.be(count-1);
      done();
    },500)
  });

});
