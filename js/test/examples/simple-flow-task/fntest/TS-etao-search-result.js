var $ = require('jquery');
var expect = require('expect.js');

describe('etao搜索结果页', function() {
  it('搜索框默认关键词为 “小米4”', function() {
    expect(jQuery('#J_searchIpt').val()).to.be('小米手机4');
  });
});
