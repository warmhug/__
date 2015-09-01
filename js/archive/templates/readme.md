
## 模板比拼 ##

各种比较选择：[地址](http://garann.github.io/template-chooser/)

勿用(无预编译，性能低)：underscore.template

### mustache式 ###

[mustache](https://github.com/janl/mustache.js) --不能预编译，轻逻辑，有各种语言(eg. java)版本  
[Hogan](https://github.com/twitter/hogan.js) -- mustache的编译器，使用基本没问题  
[handlebars](http://handlebarsjs.com/) -- 有runtime版本，基本能保证高性能；有扩展支持if else等，  

### ejs式 ###
[artTemplate](https://github.com/aui/artTemplate?source=c) -- 国内出品，特性比较全面；有预编译工具；但是模板语法不通用，没有服务端语言支持。  
[ejs](http://embeddedjs.com/) --有些古老，使用不便



### Hogan使用 ###

安装：  

	npm install hogan.js  

使用：  

	hulk *.html > tpls.js  
	hulk static/templates/*.mustache > static/js/templates.js

也可使用集成于grunt的hogan.js插件：[grunt-hogan](https://npmjs.org/package/grunt-hogan)

