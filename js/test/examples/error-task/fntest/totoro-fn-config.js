module.exports = [{
  flow: [{
    url: 'http://www.etao.com',
    scripts: ['./TS-etao-search.js'],
    afterTest: './search.js'
  }, {
    url: 'http://s.etao.com/error',
    hasTest: false
  }],
  timeout: 20 * 1000
}];
