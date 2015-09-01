
angular.module('modal', ['template/modal/modal.html'])
.provider('$modal', function () {
    var defaults = this.defaults = {
        container: document.body
    };
    this.$get = [
        function () {
            var $modal = {};
            var isShown = false;
            $modal.show = function () {
                isShown = true;
            }
            $modal.hide = function () {
                isShown = false;
            }
            $modal.toggle = function () {

            }
        }]
})
.directive('modal', ['$sce', function ($sce) {
    return {
        restrict: 'A',
        templateUrl: 'template/modal/modal.html',
        link: function (scope, element, attrs) {

        }
    }
}])

angular.module('template/modal/modal.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/modal/modal.html', 'xx');
}])