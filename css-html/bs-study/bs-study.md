bootstrap v3 学习笔记

> 官方地址：[bs3](http://getbootstrap.com/)、[bs3中文](http://v3.bootcss.com/)  
> 

## 常用
- `.form-control`应用于`input、select`上，`.control-label`应用于control元素附近的`label`元素上
- `.btn-lg、.btn-sm、.btn-xs` 使按钮大小依次变小
- [helper-classes](http://getbootstrap.com/css/#helper-classes)
    - 左浮动：pull-left 。右浮动：pull-right。清除浮动：clearfix 。块元素居中：center-block
    - 显示/隐藏：show、hidden、invisible、text-hide
    - 文字颜色：text-muted、text-primary、text- success/info/warning/danger
    - 背景颜色：bg-primary、bg-success、bg- info/warning/danger
    - 关闭按钮：`<button type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>`，三角符号：`<span class="caret"></span>`

- grid偏移：`.col-md-offset-* `类可以将列向右侧偏移
- 列排序：`.col-md-push-*`和`.col-md-pull-*`类可以很容易的改列的顺序
- 排版：
    - 无样式列表：`<ul class="list-unstyled"><li>xx</li></ul>`。横向内联列表：`<ul class="list-inline"><li>xx</li></ul>`。水平排列的描述：`<dl class="dl-horizontal"><dt>...</dt><dd>...</dd></dl>`
    - 文本对齐、省略、大小写类：`<p class="text-nowrap">No wrap text.</p>`、`text-left`、`text-right`、`text-center`、`text-justify`、`text-lowercase`、`text-uppercase`、`text-capitalize`
    - `<small>`标签或`.small`类。`<mark>高亮文本</mark>`。`<u>文本带下划线underlined</u>`。`<strong>着重</strong>`。`<em>斜体</em>`
    - 引用：`<blockquote><p>normal</p></blockquote>`、`<blockquote class="blockquote-reverse"><p>Alternate displays</p></blockquote>`
- 使用Glyphicons字体图标
    - 附在单独空元素上使用：`<span class="glyphicon glyphicon-search"></span>`
- `.visible-xs`、`.hidden-xs`，根据浏览器尺寸、显示隐藏元素

--------

## 兼容ie8

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    注意：
    bootstrap.css 需要放到本地，或与respond.js处在同域下。
    不要有 @import-property 。 

--------

## 其他 
### `col-xx-*`默认左右都有padding值15，当并列使用时padding值相加、导致间距过大

### 设置可变宽度的列

- `col-xs-*`这类列都是固定宽度，现需要：宽度可随内容多少动态改变；并有最大宽度。
- 使用`display: table;`布局[示例](http://jsfiddle.net/DnGDz/) 或`table`表格可做到宽度自适应
- 使用`Flexbox`能否解决？

> There's really no easy way to mix fluid and fixed widths with Bootstrap 3. It's meant to be like this, as the grid system is designed to be a fluid, responsive thing. You could try hacking something up, but it would go against what the Responsive Grid system is trying to do, the intent of which is to make that layout flow across different device types.  

> If you need to stick with this layout, I'd consider laying out your page with custom CSS and not using the grid.

### 基于bootstrap的可视化操作
- [Form Builder for Bootstrap](http://bootsnipp.com/forms)
- [layoutit](http://www.layoutit.com/build)、[中文](http://layoutit.justjavac.com/)、[中文版官网](http://www.layoutit.com/cn#.U8_QZICSya0)


---------


## grid(网格布局)
关于网格布局：原来版本2中直接使用 `span*` 就可以了；但现在版本3 中这东西分成了四类：`col-xs-*`、`col-sm-*`、`col-md-*` 和 `col-lg-*`，它们分别对应四种主流的屏幕宽度：手机、平板、笔记本、电脑宽屏。

bs3首先是`移动优先`，所以`col-xs-*`是默认样式，所有的内容都被假定于你在为一个移动设备做设计，相对比较小的视图。那么以上四类样式分别何时使用呢？举个实例：

    <div class="row">
        <div class="col-**-6">I’m on the left</div>
        <div class="col-**-6">I’m on the right</div>
    </div>

以上代码`col-**-6`中的`**`对应四类的使用：

- 当为`xs`时：
    - 在`手机、平板、笔记本、电脑宽屏`等各种宽度设备 都能50％对50％的划分屏幕
- 当为`sm`时：
    - 在`平板、笔记本、电脑宽屏`等宽度设备 50％对50％的划分屏幕；在`手机`上 上下堆叠显示
- 当为`md`时：
    - 在`笔记本、电脑宽屏`等宽度设备 50％对50％的划分屏幕；在`手机、平板`上 上下堆叠显示
- 当为`lg`时：
    - 在`电脑宽屏`等宽度设备 50％对50％的划分屏幕；在`手机、平板、笔记本`上 上下堆叠显示
- [示例代码]()(含混合使用情况)、[相关其他资料](http://www.oschina.net/translate/bootstrap-3-grid-introduction)


