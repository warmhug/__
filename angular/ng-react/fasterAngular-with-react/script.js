// Code goes here

 angular.module('fasterAngular', []).
  controller('mycontroller', ['$scope', function($scope){
      $scope.framework = 'ReactJs';
      $scope.data = [];
      // Fill the data map with random data
      $scope.refresh = function(){
          for(var i = 0; i < 1500; ++i) {
              $scope.data[i] = {};
              for(var j = 0; j < 5; ++j) {
                  $scope.data[i][j] = Math.random();
              }
          }
      }
      $scope.refresh()
  }]).directive('fastRepeat', function(){
      return{
          restrict: 'E',
          scope:{
              data: '='
          },
          link:function(scope, el, attrs){
              scope.$watchCollection('data', function(newValue, oldValue){
                  React.renderComponent(
                      MYLIST({data:newValue}),
                      el[0]
                  );
              })
          }
      }
  })