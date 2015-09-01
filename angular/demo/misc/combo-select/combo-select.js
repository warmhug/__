
angular.module('combo-select', ['template/combo-select/combo-select.tpl.html'])
.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])
.directive('comboSelect', ['$sce', function ($sce) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/combo-select/combo-select.tpl.html',
            scope: {
                lItems: '=leftListData',
                rItems: '=rightListData',
                checked: '@itemCheckKeyName',
                itemValue: '@'
            },
            compile: function (tElement, tAttrs, transclude) {

                //处理配置项
                var options = {
                    html: false,
                    move: true,
                    repeat: false
                };
                angular.forEach(['html', 'move', 'repeat'], function (val) {
                    if(angular.isDefined(tAttrs[val])){
                        options[val] = window.eval(tAttrs[val]);
                    }
                });
                //console.log(options);

                var result, eleHtml = tElement.html();
                var newStr = '';
                var htmlReplaceRegExp = /(ng-bind=")([^"]*)(")/gi,
                    prefix = 'ng-bind="', postfix = '"';

                if(options.html){
                    //console.log(tElement.contents(), tElement.html());
                    var indexArr = [], valArr = [];
                    while((result = htmlReplaceRegExp.exec(eleHtml)) != null){
                        indexArr.push(result.index);
                        valArr.push(result[2]);
                    }
                    for (var i = 0, begin = 0; i < indexArr.length; i++) {
                        newStr += eleHtml.substring(begin, indexArr[i]);
                        newStr += 'ng-bind-html="trust(' + valArr[i] + ')"';
                        begin = indexArr[i] + prefix.length + valArr[i].length + postfix.length;
                    }
                    if(begin < eleHtml.length){
                        newStr += eleHtml.substring(begin, eleHtml.length);
                    }
                    tElement.html(newStr);
                }

                return function (scope, element, attrs){

                    scope.checked = scope.checked || 'checked';
                    scope.itemValue = scope.itemValue || 'val';

                    scope.trust = function (text) {
                        return $sce.trustAsHtml(text);
                    }

                    scope.toRight = function () {
                        for (var i = 0, lItems = scope.lItems; i < lItems.length; i++) {
                            if(lItems[i][scope.checked]){
                                lItems[i][scope.checked] = false;
                                if(!options.repeat){
                                    var existed = false;
                                    angular.forEach(scope.rItems, function (val) {
                                        if(angular.equals(val, lItems[i])){
                                            existed = true;
                                            return;
                                        }
                                    })
                                    if(!existed){
                                        scope.rItems.push(angular.copy(lItems[i]));
                                    }
                                } else{
                                    scope.rItems.push(angular.copy(lItems[i]));
                                }
                                if(options.move){
                                    lItems.splice(i--, 1);
                                }
                            }
                        }
                    }

                    scope.toLeft = function () {
                        for (var i = 0, rItems = scope.rItems; i < rItems.length; i++) {
                            if(rItems[i][scope.checked]){
                                rItems[i][scope.checked] = false;

                                //左边一般做为数据源，一般不需要有重复数据
                                //因此，右边数据移回左边时，确保左边不重复即可
                                var existed = false;
                                angular.forEach(scope.lItems, function (val) {
                                    if(angular.equals(val, rItems[i])){
                                        existed = true;
                                        return;
                                    }
                                })
                                if(!existed){
                                    scope.lItems.push(angular.copy(rItems[i]));
                                }

                                //右边作为被动方，数据能直接删除
                                rItems.splice(i--, 1);

                            }
                        }
                    }
                }

            }
        }
    }]);
//tpl
angular.module('template/combo-select/combo-select.tpl.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/combo-select/combo-select.tpl.html',
['<div class="combo-select clearfix">',
    '<ul class="c-left">',
        '<li ng-model="item[checked]"',
            'ng-repeat="item in lItems track by $index"',
            'btn-checkbox>',
            '<div ng-if="key==itemValue"',
                 'ng-repeat="(key, val) in item"',
                 'ng-bind="val"></div>',
        '</li>',
    '</ul>',
    '<div class="control">',
        '<p class="to-right" ng-click="toRight()"> >> </p>',
        '<p class="to-left" ng-click="toLeft()"> << </p>',
    '</div>',
    '<ul class="c-right">',
        '<li ng-model="item[checked]"',
            'ng-repeat="item in rItems track by $index"',
            'btn-checkbox>',
            '<div ng-if="key==itemValue"',
                 'ng-repeat="(key, val) in item"',
                 'ng-bind="val"></div>',
        '</li>',
    '</ul>',
'</div>'].join('')
    )
}])