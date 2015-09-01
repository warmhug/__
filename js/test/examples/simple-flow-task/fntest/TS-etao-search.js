var $ = require('jquery');
var expect = require('expect.js');

describe('etao首页', function() {
  it('首页logo符合期望', function() {
    expect($('#J_etaoLogoIndex').text()).to.be('一淘网');
  });
});
