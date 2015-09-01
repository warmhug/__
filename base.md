# 组件设计

- [javascript组件化](http://purplebamboo.github.io/2015/03/16/javascript-component/)
    - 设计一个组件类（如 function TreeView(){ } ）
    - 设置组件类的配置项或属性（ function TreeView(config){ this.cfg = extend({}, config) } ）
        - 组件的属性，只能通过方法来访问。
        - 组件的属性value change后组件自动映射变化。
    - 组件类上附加组件方法（ TreeView.prototype.xx = function (){ } ）
    - 为组件添加自定义事件
        - mixin进来带有on/off/fire等方法的事件系统，为组件级别添加事件，屏蔽底层的dom事件，方便组件的使用！
    - 抽出Widget抽象类，作用是为ui组件提供统一的接口名，统一生命周期管理
    - 组件使用方式：new出组件实例使用

- [Backbone View 之间通信的三种方式](http://www.geekplux.com/2015/07/04/communicating-between-views-in-backbone.html)
- [如何实现一个mvvm组件](http://shepherdwind.com/2014/05/17/how-to-reliaze-mvvm--bidi/)
- [框架性能关注点](http://www.zhihu.com/question/31809713/answer/53544875)

## 具体组件
### form及验证
- form要支持只使用“键盘完成”，按enter键要能触发表单提交，使用type="submit"
- 声明式的「验证规则、错误提示」设置
- 动态设定错误提示 （如，Ajax返回后根据错误码手动设置错误提示）
- 可以自定义错误触发条件
    - 如required验证对于文本框默认为空时触发，对于“多选框”验证时，需要验证选择后的数据数组长度是否为零时触发，与文本框不同。
- 参考ng里针对`ng-model="xx"`绑定的xx数据进行验证，校验结果自动反馈到相应dom上。

验证方式：
以js对象的验证为主，把dom上的值附加进来，如[validate.js](https://github.com/ansman/validate.js)

### tabs - tab
- API：selected | on-select | on-deselect
- tab切换后，前一个页面的Ajax请求还没完成，要不要abort掉？

### 其他组件
- 弹窗类、展开收起类组件，处于页面底部时，展开后，不能全部出现在可视区域，需要改变滚动条位置。
- Datepicker、timepicker 注意能合到一起使用的情况，也要能分开使用
- select组件：支持Infinite scroll
- modal等弹窗类组件，必须有`destroy`方法。应用场景：普通按钮，列表
- pagination组件，如图![](https://t.alipayobjects.com/images/rmsweb/T1OIlhXmVcXXXXXXXX.png)
  如果数据总数50万+时，每页显示5个页码，下拉框就会有10万条目，导致页面dom数过大，浏览器崩溃。
- 图表组件，给出`destroy`方法，并测试是否有内存泄露(多操作或刷新几次页面是否卡顿)。

## 设计原则：
### 职责清晰
- 组件的每个模块，分别该承担哪些功能？
- 多个组件/模块协同完成一件事情，而不是一个组件替其他组件完成本该它自己完成的事情

### 开放与封闭
- 哪些设置，应该开放？应该封闭？
    - 属性配置等API对外开放；组件内部dom及状态的更改、对外封闭
- 高内聚、低耦合
    - 组件内部通过callback方式直接调用，组件与组件之间通过发布订阅的模式通信

### 其他
- 尽量避免信息冗余
    - 例如：一个东西能被另一个推导出来，就只使用一个
- api 尽量和已知概念保持一致
    - 例如api命名：聚焦常用命名是focusable，而不是canFocus等自己臆想的名字；还有如onDeselect、
    - api的功能要符合常用、遵循单一职责。例如：active表示活动状态、但不能代替表示selected选中状态。

模块间如果有层级关系的话，父类可调用子类，但子类不要去调用父类的方法？是否正确？

--------

# 页面
## SPA
- 页面上发出了Ajax请求，要等比较久时间才返回，返回成败都有弹框，但在返回结果之前「跳走」，页面跳转后弹窗是否还会有？
- 页面的边界测试：如数据量特别大时
- 切换路由后会把上个路由状态生成的html全部销毁掉，再切回来恢复不到原来的样子。问题场景如：列表页由许多查询条件组合查询出来，点击列表里某个条目进入详情，再返回到列表页，就需要手动再查询出列表。更好的是恢复上次查询生成的列表html，再更好要保持原来的滚动条位置，完全恢复现场，不会打断用户继续浏览列表。（切走之前保存查询条件、切回来再重新查询，不是个好办法，不能完全恢复之前状态）

--------


# 反模式
- 过早优化
- 分析瘫痪
    - 过度分析会延缓进展，甚至彻底终止进展。在极端情况下，分析的结果到了要做的时候已经过时了，或者更糟的是，项目或许从来走不出分析阶段。
    - 重点在于迭代和改进。伴随着更多有帮助的、有意义的分析得到的数据，每次迭代都会提供更多的反馈。没有新的数据点，更多的分析将变得越来越让人猜疑。
    - 棘手的地方在于要知道什么时候该从计划、需求收集和设计阶段转移到实施和测试阶段。
- 上帝类
    - 上帝类是控制很多其它类，以及有很多依赖类，也就有更大的责任。
    - 上帝类增长到后期就会变成维护人员的地狱——因为它违反了单一责任原则，它们难以单元测试、调试和记录文档。
- 魔法数和字符串
    - 使用未命名的数字或字符串字面量，而不是在代码里命名为常量。



--------

# 函数式编程
- [函数式编程](http://coolshell.cn/articles/10822.html)
- [函数式编程有哪些优点？](http://www.nowamagic.net/academy/detail/1220540)
- [函数式编程扫盲篇](http://www.cnblogs.com/kym/archive/2011/03/07/1976519.html)
- [函数式编程初探](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)
- [introduction-functional-javascript](http://www.sitepoint.com/introduction-functional-javascript/)
- [Functional Programming in Javascript === Garbage](http://awardwinningfjords.com/2014/04/21/functional-programming-in-javascript-equals-garbage.html)
    - javascript不适合函数式编程？

对象是面向对象的第一型，那么函数式编程也是一样，函数是函数式编程的第一型。

在纯粹函数式程式语言中，你不是像命令式语言那样命令电脑「要做什么」，而是通过用函数来描述出问题「是什么」。递回在 Haskell 中非常重要。命令式语言要求你提供求解的步骤，Haskell 则倾向于让你提供问题的描述。这便是 Haskell 没有 while 或 for 循环的原因，递回是我们的替代方案。

在面向对象编程中，我们把对象传来传去，那在函数式编程中，我们要做的是把函数传来传去，而这个，说成术语，我们把他叫做 **高阶函数**

在函数式编程中，函数是基本单位，是第一型，他几乎被用作一切，包括最简单的计算，甚至连变量都被计算所取代。在函数式编程中，变量只是一个名称，而不是一个存储单元，这是函数式编程与传统的命令式编程最典型的不同之处。


## Persistent data structure

- [Immutability in JavaScript](http://www.sitepoint.com/immutability-javascript/)
- [Persistent_data_structure](https://en.wikipedia.org/wiki/Persistent_data_structure)

> fb出品的[immutable-js](http://facebook.github.io/immutable-js/)提供了Immutable的List, Stack, Map等数据结构，
为了实现不可变性，最直接的做法可能是直接拷贝对象，但因为效率太低不可行，而是利用了structural sharing，
这样就可以最小化的拷贝对象的一部分。拷贝的是哪一部分呢？如图：
![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Purely_functional_tree_after.svg/876px-Purely_functional_tree_after.svg.png)，这样嵌套的深层对象，只需拷贝f、g、d这一个链，其他的结构共享，这样创建了一个新对象，
就达到了immutable的目的，而且效率和内存占用都比较合理。但注意一个问题[Circular references](https://github.com/facebook/immutable-js/issues/259)，这个问题在Haskell等语言中在语言层面被解决了，
但在js中似乎难以解决。[详解视频](https://www.youtube.com/watch?v=I7IdS-PbEgI)

> Structural sharing is a powerful concept, and is what enables Clojure persistent data structures to achieve O(log n) performance on operations that would otherwise require full O(n) copies of a data structure.  It turns out that you can also achieve effective structural sharing of mutable data structures if they are structurally immutable. Effectively you get opportunity to realise the same O(log n) performance for operations that produce mutable views.

应用实例：
```html
<list>
  <item></item>
  <item></item>
</list>
```
item由list的数据生成，由于immutable两者之后的state变化互不影响，但变化后两者数据状态需要同步。
同步操作也是产生新的数据，似乎比较乱？



--------

# rest
- [1](http://www.cnblogs.com/artech/p/restful-web-api-01.html)、[2](http://www.cnblogs.com/artech/p/restful-web-api-02.html)、[3](http://www.360doc.com/content/09/0918/23/11553_6152605.shtml)  
- [理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)、[RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- [理解本真的REST架构风格](http://www.infoq.com/cn/articles/understanding-restful-style)、[为啥REST如此重要？](http://www.csdn.net/article/2013-08-01/2816424-Why-REST-is-so-important)、[如何设计好的RESTful API？](http://www.infoq.com/cn/articles/how-to-design-a-good-restful-api)
- [RESTful API的十个最佳实践](http://www.cnblogs.com/xiaoyaojian/p/4612503.html)
- [jsonapi](http://jsonapi.org/format/) - [jsonapi中文](http://jsonapi.org.cn/format/)

总结：

- 使用名词而不是动词，使用名词的复数形式
- Get方法和查询参数不应该改变资源状态
- 假如资源连接到其它资源，则使用子资源形式 `GET /cars/711/drivers/4 Returns driver #4 for car 711`
- 为集合提供过滤、排序、字段选择以及分页
    - 过滤：为所有字段或者查询语句提供独立的查询参数：`GET /cars?color=red Returns a list of red cars`
    - 排序：允许跨越多字段的正序或者倒序排列：`GET /cars?sort=-manufactorer,+model`
    - 字段选择：一些情况下，我们只需要在列表中查询几个有标识意义的字段，我们不需要从服务端把所有字段的值都请求出来，所以需要支持API选择查询字段的能力，这也可以提到网络传输性能和速度：`GET /cars?fields=manufacturer,model,id,color`
    - 使用offset和limit来获取固定数量的资源结果，当其中一个参数没有出现时，应该提供各自的默认值，比如默认取第一页，或者默认取20条数据：`GET /cars?offset=10&limit=5 取第10页的5条数据`
    - 使用自定义的头X-Total-Count发回给调用段实际的资源数量。
- 使用HTTP状态码处理错误
    - 200 – OK – 一切正常
    - 201 – OK – 新资源已经被创建
    - 204 – OK – 资源删除成功

    - 304 – 没有变化，客户端可以使用缓存数据

    - 400 – Bad Request – 调用不合法，确切的错误应该在error payload中描述，例如：“JSON 不合法 ”
    - 401 – 未认证，调用需要用户通过认证
    - 403 – 不允许的，服务端正常解析和请求，但是调用被回绝或者不被允许
    - 404 – 未找到，指定的资源不存在
    - 422 – 不可指定的请求体 – 只有服务器不能处理实体时使用，比如图像不能被格式化，或者重要字段丢失。

    - 500 – Internal Server Error – 标准服务端错误，API开发人员应该尽量避开这种错误

资源、子资源、相关资源，都能通过「links」关联，达到从一个资源找到所有资源

    {
      data: {
        published_at: "02/21/1848",
        body: "In bourgeois society capital is independent and has individuality, while the living person is dependent and has no individuality.",
        author: {
          data: {
            nickname: "karlm",
            name: "Monsieur Ramboz",
          },
          links: {
            self: "/authors/karlm",
            blog_posts: "/authors/karlm/blog_posts"
          }
        }
      },
      links: {
        self: "/blog_posts/1",
        comments: "/blog_posts/1/comments",
        author: "/authors/karlm"
      }
    }


根据[richardson模型](http://martinfowler.com/articles/richardsonMaturityModel.html), REST架构的成熟度有3个等级:

- Level 0 POX (这个就不算REST了)
- Level 1 Resources
- Level 2 Http verbs
- Level 3 Hypermedia Controls

- Level 1 Resources 这一级别主要解决了Level 0 接口的问题, 使得各种资源有了自己相应的URI,
  虽然仍然是POX的交互方式, 但是每一个接口都更加紧凑和内聚, 相应的容易维护起来.
- Level 2 Http verbs 这一级别使用http verbs来对各种资源进行crud操作, 使得应用程序的接口更加的统一, 语义更加明确.
- Level 3 RESTful的架构本意是"在符合架构原理的前提下，理解和评估以网络为基础的应用软件的架构设计，得到一个功能强、性能好、适宜通信的架构。"
这个世界上规模最大的, 耦合度最低, 最稳定的, 性能最好的分布式网络应用是什么? 就是WEB本身. 规模,稳定,性能都不用说了.
为什么说耦合度低呢? 想一想每个人上网的经历, 你几乎不需要任何培训就可以上一个新的网络购物平台挑选商品,用信用卡付款,邮寄到自己家里.
把网站的程序想像成一个状态机, 用户在一系列状态转换中完成自己的目标. 这中间的每一步, 应用程序都告诉你当前的状态和可能的下一步操作, 最终引导用户从挑选商品,挑选更多商品,到支付页面,到输入信用卡信息,最终完成付费,到达状态机的终点.
这种service discoverablility和self-documenting就是level 3想解决的问题 在这里面, 告诉用户当前状态以及各种下一步操作的东西, 比如链接, 按钮等等, 就是Hypermedia Controls. Hypermedia Controls 就是这个状态机的引擎.
Level 3的REST架构就是希望能够统一这一类的Hypermedia Controls, 赋予他们标准的, 高度可扩展的标准语义及表现形式, 使得甚至无人工干预的机器与机器间的通用交互协议边的可能. 比如你可以告诉一个通用的购物客户端, "给我买个最便宜的xbox", 客户端自动连上google进行搜索, 自动在前10个购物网站进行搜索, 进行价格排序, 然后自动挑选最便宜的网站, 进行一系列操作最终完成用信用卡付费, 填写个人收件地址然后邮寄. 这些都依赖于Hypermedia Controls带来的这种service discoverablility和self-documenting。



# http
HTTP协议本身是一种面向资源的应用层协议，但对HTTP协议的使用实际上存在着两种不同的方式：一种是RESTful的，它把HTTP当成应用层协议，比较忠实地遵守了HTTP协议的各种规定；另一种是SOA的，它并没有完全把HTTP当成应用层协议，而是把HTTP协议作为了传输层协议，然后在HTTP之上建立了自己的应用层协议。

幂等性并不属于特定的协议，它是分布式系统的一种特性；所以，不论是SOA还是RESTful的Web API设计都应该考虑幂等性。（幂等性是数学中的一个概念，表达的是N次变换与1次变换的结果相同）

- HTTP GET方法用于获取资源，不应有副作用，所以是幂等的。（不会改变资源的状态，但不是每次GET的结果相同）
- HTTP DELETE方法用于删除资源，有副作用，但它应该满足幂等性。
- HTTP POST和PUT的区别容易被简单地误认为“POST表示创建资源，PUT表示更新资源”；而实际上，二者均可用于创建资源，更为本质的差别是在幂等性方面。
- POST所对应的URI并非创建的资源本身，而是资源的接收者。比如：POST http://www.forum.com/articles的语义是在http://www.forum.com/articles下创建一篇帖子，HTTP响应中应包含帖子的创建状态以及帖子的URI。两次相同的POST请求会在服务器端创建两份资源，它们具有不同的URI；所以，POST方法不具备幂等性。
- 而PUT所对应的URI是要创建或更新的资源本身。比如：PUT http://www.forum/articles/4231的语义是创建或更新ID为4231的帖子。对同一URI进行多次PUT的副作用和一次PUT是相同的；因此，PUT方法具有幂等性。

### Content-type & Accept
- Content-type in a request refers to the type of the data you are sending!
    - [Do I need a content type for http get requests](http://stackoverflow.com/questions/5661596/do-i-need-a-content-type-for-http-get-requests)：Get requests should not have content-type because they do not have request entity (that is, a body)
- Accept：Content-Types that are acceptable for the response.
