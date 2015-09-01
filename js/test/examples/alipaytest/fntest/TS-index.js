"use strict";

var $ = require('jquery');
var expect = require('expect.js');
var es = require('event-simulate');

describe('支付宝-首页测试', function () {

  /**
   * @操作步骤
   *   无
   * @预期结果
   *   支付宝首页标题为“支付宝 知托付！”
   */
  it('正确展示网页标题', function () {
    var title = $('title');
    expect(title.text()).to.be('支付宝 知托付！');
  });

});
