# compile & build & deploy

[gulp 手册1](http://p.tb.cn/rmsportal_127_gulp_E6_89_8B_E5_86_8C1.pdf) / [gulp 手册2](http://p.tb.cn/rmsportal_127_gulp_E6_89_8B_E5_86_8C2.pdf)

[lerna](https://github.com/lerna/lerna)：适合多个 package 有互相引用、代码规范一致、统一管理 issue 的项目。示例 [practices](https://github.com/LittleBreak/lerna-best-practices) / [dva](https://github.com/dvajs/dva)

[webpack 配置文件生成工具](https://webpack.jakoblind.no/)

Webpack 5 module federationtion 联邦模块 [介绍](https://juejin.cn/post/6844904187147321352)
[示例](https://github.com/xff1874/w5mf)

[qiankun 子应用嵌套](https://github.com/umijs/qiankun/issues/960)、[umi-plugin-qiankun 嵌套子应用](https://umijs.org/plugins/plugin-qiankun#%E5%B5%8C%E5%A5%97%E5%AD%90%E5%BA%94%E7%94%A8)


## lint 配置

vscode Multi-root Workspaces 时 eslint 插件会报错，在工作区(不是用户)设置文件 .vscode/settings.json 里加入：

```json
"eslint.workingDirectories": [{"mode": "auto"}]
```
