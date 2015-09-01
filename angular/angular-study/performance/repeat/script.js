angular.module('repeatPerformanceDemo', []);

function initialize(){
  var arr = [];
  for(var i = 0; i < 10000; i = i + 1) {
    var item = {label: i, trackingKey: i};
    arr[i] = item;
  }
  return arr;
}

function mockServerFetch (){
  var a = [];
  for(var i = 0; i < 10000; i = i + 1) {
    var item = {label: i, trackingKey: i};
    a[i] = item;
  }
  a.push({label: 101010, trackingKey: 101010});
  return a;
}

angular.module('repeatPerformanceDemo').controller('parentController', ['$scope', function (scope){
  scope.fast = false;
  scope.slow = false;
  scope.trackBy = false;
  scope.arr = initialize();
  scope.showFast = function(){
    scope.fast = true;
    scope.slow= false;
    scope.trackBy = false;
  }
  scope.showSlow = function(){
    scope.fast = false;
    scope.slow= true;
    scope.trackBy = false;
  }
  scope.showTrackBy = function(){
    scope.fast = false;
    scope.slow= false;
    scope.trackBy = true;
  }
}]);

angular.module('repeatPerformanceDemo').directive('slowRepeat', [function(){
  return {
    restrict: 'E',
    templateUrl: './slow.html',
    link: function(scope){
      scope.arr = initialize();
      scope.update = function(){
        scope.arr = mockServerFetch();
      }
    }
  }
}]);

angular.module('repeatPerformanceDemo').directive('fastRepeat', [function(){
  return {
    restrict: 'E',
    templateUrl: './fast.html',
    link: function(scope){
      scope.update = function(){
        var a = mockServerFetch();
        for(var i = scope.arr.length - 1; i >=0; i--){
          var result = _.find(a, function(r){
            return (r && r.trackingKey == scope.arr[i].trackingKey);
          });
          if (!result){
            scope.arr.splice(i, 1);
          } else {
            //var json = JSON.parse(angular.toJson(scope.arr[i]))
            //console.log( scope.arr[i], json, result );
            //console.log( a.indexOf(json), a.indexOf(scope.arr[i]) );
            a.splice(a.indexOf(scope.arr[i]), 1);
          }
        }
        console.log( a );
        _.map(a, function(newItem){
          scope.arr.push(newItem);
        });
      }
    }
  }
}]);

angular.module('repeatPerformanceDemo').directive('trackByRepeat', [function(){
  return {
    restrict: 'E',
    templateUrl: './trackBy.html',
    link: function(scope){
      scope.update = function(){
        scope.arr = mockServerFetch();
      }
    }
  }
}]);