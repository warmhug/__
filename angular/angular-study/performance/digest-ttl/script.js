angular.module('bugapp', [], function($rootScopeProvider) {
  $rootScopeProvider.digestTtl(15);
});
angular.module('bugapp')
   .controller('bugController', function ($scope) {
      $scope.item = {
        ID: '1st level',
        children: [{
          ID: '2nd level',
          children: [{
            ID: '3rd level',
            children: [{
              ID: '4th level',
              children: [{
                ID: '5th level',
                children: [{
                  ID: '6th level',
                  children: [{
                    ID: '7th level',
                    children: [{
                      ID: '8th level',
                      children: [{
                        ID: '9th level',
                        children: [{
                          ID: '10th level'
                        }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      };
});