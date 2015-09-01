(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 *
 */
"use strict";

var MainController = require("./lib/MainController").MainController;

var SearchService = require("./lib/SearchService").SearchService;

var resultDirective = require("./lib/resultDirective").result;

angular.module("app", []).directive("result", resultDirective).controller("mainController", MainController).service("searchService", SearchService);

},{"./lib/MainController":2,"./lib/SearchService":3,"./lib/resultDirective":4}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 */

var MainController = (function () {
  function MainController($scope, searchService) {
    var _this = this;

    _classCallCheck(this, MainController);

    var vm = this;

    this.searchService = searchService;

    $scope.$watch("vm.searchTxt", function (newData, oldData) {
      _this.search();
    });
  }

  _createClass(MainController, {
    search: {
      value: function search() {
        var _this = this;

        this.searchService.fetch(this.searchTxt).then(function (response) {

          _this.res = response;
          _this.resBidi = angular.copy(response);
        });
      }
    }
  });

  return MainController;
})();

MainController.$inject = ["$scope", "searchService"];

exports.MainController = MainController;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 */

var SearchService = (function () {
  function SearchService($timeout) {
    _classCallCheck(this, SearchService);

    this.timeout = $timeout;
  }

  _createClass(SearchService, {
    fetch: {
      value: function fetch(txt) {
        // return a promise
        return this.timeout(function () {
          if (!txt) {
            return { items: [], len: 0 };
          }

          var res = [];
          for (var i = 0; i < 10; i++) {
            res.push(txt + i);
          }
          return { items: res, len: res.length };
        }, 100);
      }
    }
  });

  return SearchService;
})();

SearchService.$inject = ["$timeout"];

exports.SearchService = SearchService;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function result() {
  return {
    restrict: "EA",
    template: "\n        <div>\n          <h3>单向绑定</h3>\n          <ul>\n            <li ng-repeat=\"item in vm.res.items track by $index\">\n              <span>{{ item }}</span> \n            </li>\n          </ul>     \n          <h3>双向绑定</h3>\n          <ul>\n            <li ng-repeat=\"item in vm.resBidi.items\"> \n              <span>{{ item }}</span> \n            </li>\n          </ul>\n        </div>\n      ",
    scope: {
      resBidi: "=?",
      res: "@"
    },
    link: linkFunc,
    controller: resultController,
    controllerAs: "vm",
    bindToController: true // because the scope is isolated
  };

  function linkFunc(scope, el, attr, ctrl) {
    console.log(scope, "linkfn");
  }
}

resultController.$inject = ["$scope"];

function resultController($scope) {
  var _this = this;

  // Injecting $scope just for comparison
  var vm = this;

  var setDefault = function () {
    return { items: ["default"], len: 1 };
  };

  $scope.$watch("vm.resBidi", function (newData, oldData) {
    //console.log(newData)
    if (!newData || (newData = angular.isString(newData) ? JSON.parse(newData) : newData) && !newData.len) {
      _this.resBidi = setDefault();
    } else {
      _this.resBidi = newData;
    }
  });

  //设置默认值，及数据变化时候，重新设置值
  $scope.$watch("vm.res", function (newData, oldData) {
    if (!newData || (newData = angular.isString(newData) ? JSON.parse(newData) : newData) && !newData.len) {
      _this.res = setDefault();
    } else {
      _this.res = newData;
    }
  });
}

exports.result = result;

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map