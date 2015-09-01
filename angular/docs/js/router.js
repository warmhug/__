/**
 *
 */
angular.module('app.router', []).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/demo');
  $stateProvider.state('demo', {
    url: "/demo",
    templateUrl: "./demo.html",
    controller: ['$scope', 'sel', function ($scope, sel) {
      sel.selItem($scope, 'demo', '../demo/')
    }]
  })
}).factory('sel', [
  function () {
    return {
      selItem: function ($scope, key, src) {
        var list = $scope.list = dataStore[key];
        $scope.selItem = function (index) {
          angular.forEach(list, function (item) {
            item.sel = false;
          });
          list[index].sel = true;
          $scope.src = src + list[index].url;
        }
        $scope.selItem(0);
      }
    }
  }
]);
