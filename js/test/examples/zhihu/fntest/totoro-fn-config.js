module.exports = [
  {
    url: 'http://www.zhihu.com/question/21974503',
    scripts: 'TS-question-vote-unLogin.js'
  },
  {
    flow:[
      {
        url: 'http://www.zhihu.com/#signin',
        scripts: 'H-login.js'
      },
      {
        url:  'http://www.zhihu.com',
        scripts: 'H-jump.js'
      },
      {
        url: 'http://www.zhihu.com/question/21974503',
        scripts: 'TS-question-vote-logined.js'
      }
    ]
  }
];
