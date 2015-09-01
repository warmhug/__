/**
 *
 */
class MainController {
  constructor($scope, searchService) {
    var vm = this;

    this.searchService = searchService;

    $scope.$watch('vm.searchTxt', (newData, oldData) => {
      this.search();
    })
  }

  search() {
    this.searchService
        .fetch(this.searchTxt)
        .then(response => {
           
          this.res = response; 
          this.resBidi = angular.copy(response);

        });
  }
}
MainController.$inject = ['$scope', 'searchService']

export { MainController }