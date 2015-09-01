var m = angular.module('views-directive', ['ngAnimate']);

m.directive('views', function() {
  return {
    restrict: 'E',
    controller: function() {
      var views = {};
      
      this.$addView = function(ctrl) {
        views[ctrl.$name] = ctrl;
      };
      
      this.$switchTo = function(viewName) {
        for (var k in views) {
          if (k == viewName) {
            views[k].$show();
          } else {
            views[k].$hide();
          }
        }
      };
    },
    link: function(scope, el, attrs, viewsCtrl) {
      el.on('click', '[view-target]', function() {
        var viewName = angular.element(this).attr('view-target')
        viewsCtrl.$switchTo(viewName);
      });
      
      // Make the view controls available on the scope
      scope.$views = viewsCtrl;
    }
  };
});

m.directive('view', function($animate) {
  return {
    restrict: 'E',
    require: ['view', '^views'],
    controller: function($element, $attrs) {
      this.$name = $attrs.name;
      this.$show = function() { $animate.removeClass($element, 'view-hide'); }
      this.$hide = function() { $animate.addClass($element, 'view-hide'); }
    },
    link: function(scope, el, attrs, ctrls) {
      var viewCtrl = ctrls[0];
      var viewsCtrl = ctrls[1];
      
      viewsCtrl.$addView(viewCtrl);
    
      if (attrs.initial !== undefined) {
        viewCtrl.$show();
      } else {
        viewCtrl.$hide();
      }
    }
  };
});