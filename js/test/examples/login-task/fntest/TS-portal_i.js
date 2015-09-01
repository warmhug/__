var $ = require('jquery');
var expect = require('expect.js');

describe('检查账户区域', function() {
  it('余额需大于等于 0', function() {
    expect(parseInt($('#J-assets-balance .i-assets-balance-amount').text().trim())).to.above(0);
  });
});
