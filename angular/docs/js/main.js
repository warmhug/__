
var dataStore = {
  demo: [
    {sel: false, name: '简单切换', url: 'misc/switch.html'},
    {sel: false, name: '全面示例', url: 'form-plus/demo.html'},
    {sel: true, name: '静态form元素集合', url: 'form/bs-form.html'},
    {sel: false, name: '表单简单验证', url: 'form/ng-validation.html'},
    {sel: false, name: '表单自定义验证', url: 'form/ng-validation-custom.html'},
    {sel: false, name: '简单grid', url: 'grid/simple.html'},
    {sel: false, name: '带动作grid', url: 'grid/simple-action.html'},

    { sel: false, name:'左右互选', url:'combo-select/demo.html' },
    { sel: false, name:'ui-utils', url:'ui-utils/demo.html' },
    { sel: false, name:'简单rating', url:'rating/docs/demo.html' },
    { sel: false, name:'tags输入框', url:'ng-tags-input/demo.html' },
    { sel: false, name:'textCurtain', url:'textCurtain/docs/demo.html' }
  ]
};

var app = angular.module('app', ['ngAnimate', 'ui.router', 'app.router']);

app.config(function($sceProvider) {
  $sceProvider.enabled(false);
}).run(function($rootScope, $state) {
  $rootScope.$state = $state;
});

app.directive('autoHeightIframe', [
  function () {
    return {
      restrict: 'EA', link: function (scope, element, attrs) {
        var ele = element[0];
        ele.onload = function () {
          var iframeWin = ele.contentWindow || ele.contentDocument.parentWindow;
          element.css('height', (iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + 100)
        }
      }
    }
  }
]);
