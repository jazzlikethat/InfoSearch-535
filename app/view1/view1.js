'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$location', function($scope, $location) {
    $scope.searchInput = '';

    $scope.goToSearchPage = goToSearchPage;

    function goToSearchPage() {
      if ($scope.searchInput.trim() === '') {
        return;
      }
      $location.path('/search').search('query', $scope.searchInput);
    }
}]);