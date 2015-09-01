
  function result() {
    return {
      restrict: 'EA',
      template: `
        <div>
          <h3>单向绑定</h3>
          <ul>
            <li ng-repeat="item in vm.res.items track by $index">
              <span>{{ item }}</span> 
            </li>
          </ul>     
          <h3>双向绑定</h3>
          <ul>
            <li ng-repeat="item in vm.resBidi.items"> 
              <span>{{ item }}</span> 
            </li>
          </ul>
        </div>
      `,
      scope: {
        resBidi: '=?', 
        res: '@'
      },
      link: linkFunc,
      controller: resultController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    }; 

    function linkFunc(scope, el, attr, ctrl) {
        console.log(scope, 'linkfn');
    }
  }

  resultController.$inject = ['$scope'];

  function resultController($scope) {
    // Injecting $scope just for comparison
    var vm = this;

    var setDefault = () => {
      return { items: ['default'], len: 1}
    }

    $scope.$watch('vm.resBidi', (newData, oldData) => {
      //console.log(newData)
      if(!newData || (newData = angular.isString(newData) ? JSON.parse(newData) : newData) && !newData.len) {
        this.resBidi = setDefault()
      } else {
        this.resBidi = newData;
      }
    })

    //设置默认值，及数据变化时候，重新设置值
    $scope.$watch('vm.res', (newData, oldData) => { 
      if(!newData || (newData = angular.isString(newData) ? JSON.parse(newData) : newData) && !newData.len) {
        this.res = setDefault()
      } else {
        this.res = newData;
      }
    })

  }

  export { result }