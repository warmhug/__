var myModule = angular.module('MyApp', ['ngAnimate'])
myModule.animation('.repeat-animation',
  ['$timeout', function($timeout) {

  var queue = {
    enter : [], leave : []
  };
  function queueAnimation(event, delay, fn) {
    var timeouts = [];
    var index = queue[event].length;
    queue[event].push(fn);
    queue[event].timer && $timeout.cancel(queue[event].timer);
    queue[event].timer = $timeout(function() {
      angular.forEach(queue[event], function(fn, index) {
        timeouts[index] = $timeout(fn, index * delay * 1000, false);
      });
      queue[event] = [];
    }, 10, false);

    return function() {
      if(timeouts[index]) {
        $timeout.cancel(timeouts[index]);
      } else {
        queue[index] = angular.noop;
      }
    }
  };

  return {
    enter : function(element, done) {
      element = $(element[0]);
      var cancel = queueAnimation('enter', 0.2, function() {
        element.css({ top : -20 });
        element.animate({ top : 0 }, done);
        var cancelFn = cancel;
        cancel = function() {
          cancelFn();
          element.stop();
          element.css({ top : 0 });
        };
      }); 
      return function onClose(cancelled) {
        cancelled && cancel();
      };
    },
    leave : function(element, done) {
      element = $(element[0]);
      var cancel = queueAnimation('leave', 0.2, function() {
        element.css({ top : 0 });
        element.animate({ top : -20 }, done);
        var cancelFn = cancel;
        cancel = function() {
          cancelFn();
          element.stop();
          //no point in animating a removed element
        };
      }); 
      return function onClose(cancelled) {
        cancelled && cancel();
      };
    }
  }
}]);
