'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$location','$window', function($scope, $location,$window) {
    
  $scope.searchInput = $location.search().query;
  $scope.searchResults = [];

  // Temp
  $scope.searchResults = Array.apply(null, Array(20)).map(Number.prototype.valueOf,0);
  console.log($scope.searchResults);

    $scope.goToHomePage = goToHomePage;

    function goToHomePage() {
      $location.path('/').search('query', null);
    }
    
    $scope.fetchResultsForQuery = fetchResultsForQuery;
    function fetchResultsForQuery() {
        if ($scope.searchInput.trim() === '') {
          return;
        }
        $location.path('/search').search('query', $scope.searchInput);
      }
    
    $scope.showAnalytics = showAnalytics;
    function showAnalytics() {
    	
    	 $location.path('/analysis').search('query', $scope.searchInput);
       
      }
    
    
}]);
