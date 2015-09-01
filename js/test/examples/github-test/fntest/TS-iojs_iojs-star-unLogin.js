'use strict';

var $ = require('jquery');
var expect = require('expect.js');
var es = require('event-simulate');

describe('github项目页-star功能-未登录用户', function () {

  /**
   * @操作步骤
   *   鼠标悬停在star区域
   * @预期结果
   *   弹出浮层，显示文字 You must be signed in to star a repository
   */
  it('正确展示文字提示', function () {
    // 获取star节点
    var starArea = $('ul.pagehead-actions a.btn-with-count').eq(1);
    // 触发鼠标悬停事件
    starArea[0].focus();
    expect(window.getComputedStyle(starArea[0], ':after').content).to.be('\'You must be signed in to star a repository\'');
  });

  /**
   * @操作步骤
   *   无
   * @预期结果
   *   star区域的href属性为 /login
   */
  it('正确跳转到注册页', function () {
    var starArea = $('ul.pagehead-actions a.btn-with-count').eq(1);
    expect(starArea[0].href).to.match(/^https:\/\/github\.com\/login/);
  });
});
