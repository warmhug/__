module.exports = [{
  flow: [{
    url: 'http://www.etao.com',
    scripts: ['./TS-etao-search.js'],
    afterTest: './search.js'
  }, {
    url: 'http://s.etao.com/search',
    scripts: ['./TS-etao-search-result.js']
  }]
}];
