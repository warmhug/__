angular.module('FundooDirectiveTutorial', [])
  .controller('FundooCtrl', function($scope, $window) {
    $scope.rating = 5;
    $scope.saveRatingToServer = function(rating) {
      $window.alert('Rating selected - ' + rating);
    };
  })
  .directive('fundooRating', function () {
    return {
      restrict: 'A',
      scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {
        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };
        scope.$watch('ratingValue', function(oldVal, newVal) {
          React.renderComponent(window.FundooRating({scope: scope}), elem[0]);
        });
      }
    }
  });
