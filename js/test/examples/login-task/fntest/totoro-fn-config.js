module.exports = [{
  // 关于跳转检测, 需要注意的是, 登录和链接跳转有些情况下不是直接跳转到目的页面. 而是会经过一些中转页面.
  // 基本上这些跳转都是302, 目前就发现在登录那里, 有一个安全校验页面, 会是通过自己页面的脚本, 进行表单提交.
  user: 's090501@yahoo.cn',
  flow: [{
    url: 'http://personalweb.stable.alipay.net/portal/i.htm',
    scripts: ['./TS-portal_i.js'],
    afterTest: './pay.js'
  }]
}];
