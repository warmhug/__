
var app = angular.module('app', [
    'ui.bootstrap',
    'mgcrea.ngStrap',
    //'checkboxAll',
    'angularFileUpload',
    'ngThumb'
]);

//统一的config
app.config(function($provide, $httpProvider, $sceProvider,
                    $datepickerProvider, $timepickerProvider,
                    $alertProvider){
    $sceProvider.enabled(false);  // 完全禁掉$sce

    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    angular.extend($datepickerProvider.defaults, {
        dateFormat: 'yyyy-MM-dd',
        startWeek: 1
    });
    angular.extend($timepickerProvider.defaults, {
        timeFormat: 'HH:mm:ss',
        length: 5,
        minuteStep: 1
    });
    angular.extend($alertProvider.defaults, {
        animation: 'am-fade-and-slide-top',
        //placement: 'top-right',
        duration: 5,
        type: 'info'
    });
});

//时间操作
app.factory('app.date', [function(){
    function recentDay(dateObj, numDays) {
        return dateObj.setDate(dateObj.getDate() - numDays);
    }
    return {
        today: function () {
            var dateObj = new Date();
            //今天的 0点
            var startObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
            return {
                start: startObj,
                //今天的 23:59:00
                end: startObj.getTime() + (24*60 - 1)*60*1000
            }
        },
        front: function (dayNum) {
            //var dateObj = new Date();
            return {
                start: recentDay(new Date(), dayNum),
                end: recentDay(new Date(), 0)
            }
        }
    }
}]);

app.controller('main', [
    '$scope',
    '$http',
    '$timeout',
    'app.date',
    '$alert',
    'FileUploader',
function($scope, $http, $timeout, appDate, $alert, FileUploader){

    //查询条件
    var pInfo = $scope.pInfo = angular.copy(window.personInfo);

    /**
     *  angular-ui 日历、时间组件
     */
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();
    $scope.clear = function () {
        $scope.dt = null;
    };
    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };
    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.mytime = new Date();
    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.mytime);
    };

    /**
     *  时间选择
     */
    pInfo.maxDate = new Date(2016, 11, 30);
    pInfo.minDate = new Date(2013, 11, 30);
    $scope.queryByDateRange = function (arg) {
        switch (arg) {
            case '1d':
                var today = appDate.today();
                pInfo.minDate = today.start;
                pInfo.maxDate = today.end;
                break;
            case '7d':
                var today = appDate.front(7);
                pInfo.minDate = today.start;
                pInfo.maxDate = today.end;
                break;
            case '1m':
                console.log(1);
                break;
            case '3m':
                console.log('default');
        }
    };

    //默认展开高级搜索
    $scope.isCollapsed = false;

    //上传文件
    var uploader = $scope.uploader = new FileUploader({
        url: '/upload'
    });
    // FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    // CALLBACKS
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    //提交
    $scope.formSubmit = function (firstPage) {
        if($scope.myForm.$invalid){
            alert('验证未通过');
            return;
        }

        var pInfo = $scope.pInfo;
        var schResult = $scope.schResult;
        var submitData = {
            currentPage: firstPage || (schResult ? schResult.currentPage : 0),
            name: pInfo.name,
            tags: (function () {
                var tags = [];
                angular.forEach(pInfo.tags, function (item) {
                    item.flag && tags.push(item.name);
                });
                return tags;
            })()
        };

        //发起异步请求
        $http({
            method: 'GET', //实际表单提交应该设为POST
            url: 'data.js',
            data: $.param(submitData)
        }).success(function (data) {
            //console.log( data );
            $alert({
                content: '查询成功'
            });

            //查询结果处理
            var newRes = angular.copy(window.schResult);
            newRes.currentPage = submitData.currentPage;
            $scope.schResult = newRes;

        }).error(function (data, status, headers, config) {
            console.log( data );
            $alert({
                type: 'danger',
                content: '查询失败'
            })
        });
    };
    setTimeout(function (obj) {
        $scope.formSubmit(1);
    }, 1000);

    //重置
    $scope.reset = function () {
        $scope.pInfo = angular.copy(personInfo);
    };

    //删除条目
    $scope.del = function (index) {
        $scope.schResult.lists.splice(index, 1);
    };

    //编辑条目
    $scope.editItem = angular.copy(window.editItem);
    var editIndex;
    $scope.edit = function (self, index) {
        console.log( self, index);
        editIndex = index;
        var editItem = $scope.editItem;
        //从 list 拷贝到 edit pane
        angular.forEach($scope.schResult.lists[index], function (value, key) {
            if(editItem.hasOwnProperty(key)){
                if(key === 'selectedSex'){
                    angular.forEach(editItem.sex, function (item) {
                        if(item.name === value){
                            value = item.id;
                        }
                    });
                }
                editItem[key] = angular.copy(value);
            }
        });
    };
    $scope.editSave = function () {
        var oriItem = $scope.schResult.lists[editIndex];
        //从 edit pane 拷贝回 list
        angular.forEach($scope.editItem, function (value, key) {
            if(oriItem.hasOwnProperty(key)){
                if(key === 'selectedSex'){
                    angular.forEach(editItem.sex, function (item) {
                        if(item.id === value){
                            value = item.name;
                        }
                    });
                }
                oriItem[key] = angular.copy(value);
            }
        });
    };
    $scope.editCancel = function () {

    };


}]);
