
- [styleguide](https://github.com/johnpapa/angular-styleguide)、[中文](https://github.com/johnpapa/angular-styleguide/blob/master/i18n/zh-CN.md)
    - 一个view定义一个controller，尽量不要在其它view中使用这个controller。把可重用的逻辑放到factory中，保证controller的单一，只专注于当前视图。为什么？：不同的view用同一个controller是非常不科学的，良好的端对端测试覆盖率对于保证大型应用稳定性是必需的。

[ng-stats](https://github.com/kentcdodds/ng-stats)


- [angular2全面理解1](http://blog.mgechev.com/2015/04/06/angular2-first-impressions/)、
[angular2全面理解](http://angular-tips.com/blog/2015/06/why-will-angular-2-rock/)、
[angular2-change-detection](http://victorsavkin.com/post/114168430846/two-phases-of-angular-2-applications)、
[change-detection-in-angular-2](http://victorsavkin.com/post/110170125256/change-detection-in-angular-2)

[angular并不慢, reactjs并没很快](http://blog.500tech.com/is-reactjs-fast/)

## 优化与性能

- [tips](http://www.alexkras.com/11-tips-to-improve-angularjs-performance/)
- [优化controller](https://scotch.io/tutorials/making-skinny-angularjs-controllers)
- [digest-ttl](https://github.com/angular/angular.js/issues/6440)
- [Boost the Performance of an AngularJS Application Using Immutable Data](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/)

- 内置directive如`ng-repeat`、`ng-show`、`ng-hide`等都会绑定数据，数据改变时都会触发所有数据的「脏检查」。
  - 如果`ng-repeat`循环里有过多的`ng-show`、`{{ data }}`等绑定，watcher数量会repeat好多倍！
  - 没必要用`ng-repeat`的地方就不用。
  - 需要操作dom时，自己写directive，使用jQuery来操作。（与框架初衷有矛盾）

对于树控件，涉及大量数据时、会导致绑定效率低下，可改用第三方树控件？

瓶颈点：$parse、$eval与eval()

- [ng-conf2015性能优化](http://youtu.be/wbcJfg-d5nI?t=16m57s)、[全面介绍](https://www.airpair.com/angularjs/posts/angularjs-performance-large-applications)
- [优化方法](http://www.slideshare.net/damienklinnert/angular-performance-tuning-for-large)、[几种优化方法](http://www.binpress.com/tutorial/speeding-up-angular-js-with-simple-optimizations/135)、[7个建议](http://www.csdn.net/article/2013-09-18/2816972-AngularJS-performance-tuning-for-long-list)
- [长列表的性能问题](http://tech.small-improvements.com/2013/09/10/angularjs-performance-with-large-lists/)、[性能文章](https://medium.com/@jeffwhelpley/is-angularjs-fast-enough-98dcf96406c8)

- $digest优化、$destroy使用
    - [使用$scope.$digest()来进行性能优化](http://www.bennadel.com/blog/2595-using-scope-digest-as-a-performance-optimization-in-angularjs.htm)
    - 该使用 element.on('$destroy', xx) 或者 scope.on('$destroy')？ element.bind('$destroy'...) is being called before scope.$on('$destroy'...)
    - [使用示例1](http://rinat.io/blog/angularjs-and-jquery-plugins-memory-leaks)
    - [Don't Forget To Cancel $timeout Timers In Your $destroy Events](http://www.bennadel.com/blog/2548-don-t-forget-to-cancel-timeout-timers-in-your-destroy-events-in-angularjs.htm)
- dirty checking function 不应该做任何的 DOM access
- [angular-vs-repeat](https://github.com/kamilkp/angular-vs-repeat)


## angular1

如何自己实现angular scope：http://teropa.info/blog/2013/11/03/make-your-own-angular-part-1-scopes-and-digest.html
翻译：http://www.ituring.com.cn/article/39865

[ngmodules](http://ngmodules.org/)

a front-end framework by non-front-enders for non-front-enders.

I’d say Angular is mostly being used by people from a Java background because its coding style is aimed at them. Unfortunately they aren’t trained to recognise Angular’s performance problems.

compile和link函数，借鉴于传统的编译器概念：编译再链接

AngularJS的理念是声明式、双向绑定,它不仅可 以跟普通HTML元素绑定,还可以绑定SVG，
通过对HTML的绑定,我们不需要jQuery了;通过对SVG的绑定,我们不需要Raphael了

MVVM的理念是UI和数据模型分离。
但是,有一些UI部件会直接插⼊入代码流程,⽐如,各种对话框,操作提示,如何处理?
AngularJS的推荐实践是把DOM操作封装在 directive中, 但这种情况并不适合 ，
这类适合做成服务, 并⾮非所有服务层都⼀一定不能 操作DOM


## angular2

No Two-Way data-binding

One of the things AngularJS 1.x was loved about was the two-way data-binding using ng-model. Well, it is dropped from v2.0. Initially it might seems a bit weird, crazy and frustrating but it is actually a really good thing, do not be heartbroken. Removing the two-way data-binding leads to:

- More explicit data-flow
- No circular dependencies between bindings (so no TTL of the $digest)
- Better performance
    - The digest loop could be run only once
    - We can create apps, which are friendly to immutable/observable models, which allows us to make further optimizations (for more information about immutable data take a look at my talk at ng-vegas or this great [post by Victor Savkin](http://victorsavkin.com/post/110170125256/change-detection-in-angular-2), a core member of the AngularJS team)


It implements some of the ideas from ReactJS, mostly the unidirectional data flow, which makes it work great with the flux architecture. It is on top of web standards (which is a big bonus compared to ReactJS) and takes advantage of some of the web components’ APIs.

"In Angular 1, we started with templates and controllers, and the component model was actually an afterthought. In Angular 2, we're embracing the component model, and we're making components the basic building block for building applications." — Tobias Bosch



----------------------------------------------

## 提的issue

[链接](https://github.com/angular/angular.js/issues/9247)

$httpProvider.interceptors add global params and templateUrl in directive

When the `.config()` block has the code below:

    $httpProvider.interceptors.push(function($q) {
        return {
            'request': function(config) {
                if(!config.params) config.params = {};
                config.params.ctoken = 'sfdsf343sxsdf';
                return config || $q.when(config);
            }
        }
    });

The `templateUrl` in the `directive` will be attached with `ctoken`, Thus , the `templateUrl` will become to like this: `http://xx.com/yy/template/alert/alert.html?ctoken=sfdsf343sxsdf`, and `$http` service will use the  templateUrl to fetch the resource from remote server, and it maybe meet `404 error`. But I just want to use local script template or $templateCache ...



[链接](https://github.com/angular/angular.js/issues/7838)

HI, this is a suggestion, because it may not be a bug. In the new stable [angular-sanitize 1.2.18 version](https://code.angularjs.org/1.2.18/angular-sanitize.js), at line of 478:

    angular.module('ngSanitize', []).provider('$sanitize', $SanitizeProvider);

whether it should definitely depend on 'ng' module ? become to like this:

    angular.module('ngSanitize', ['ng']).provider('$sanitize', $SanitizeProvider);

Because now I want to directly join `angular-sanitize.js` file with `angular.js` file, and don't want to do this `angular('myApp', ['ngSanitize'])` in my daily use, so i change the angular-sanitize.js file like above, and change the `bootstrap`function in angular.js file like below:

    modules = modules || [];
    modules.unshift(['$provide', function($provide) {
      $provide.value('$rootElement', element);
    }]);
    modules.unshift('ng');

      //modify start
      modules.unshift('ngAnimate');
      modules.unshift('ngSanitize');
      //modify end

    var injector = createInjector(modules);
    injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector', '$animate',
       function(scope, element, compile, injector, animate) {
        scope.$apply(function() {
          element.data('$injector', injector);
          compile(element)(scope);
        });
      }]
    );

Thus, it can be rightly work. Maybe it is useful for you.
