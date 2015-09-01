var $ = require('jquery');
var expect = require('expect.js');

describe('etao首页', function() {
  it('logo 文字显示为 “一淘网”', function() {
    expect($('#J_etaoLogoIndex').text()).to.be('一淘网');
  });
});
