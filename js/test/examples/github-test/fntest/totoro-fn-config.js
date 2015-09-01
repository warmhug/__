module.exports = [
  {
    url: 'https://github.com/iojs/io.js',
    scripts: './TS-iojs_iojs-star-unLogin.js'
  },
  {
    flow: [
      {
        url: 'https://github.com/login?return_to=/iojs/io.js',
        scripts: 'H-login.js'
      },
      {
        url: 'https://github.com/iojs/io.js',
        scripts: 'TS-iojs_iojs-star-logined.js'
      }
    ]
  }
];
