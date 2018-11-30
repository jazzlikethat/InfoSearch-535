'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/analysis', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope', '$location', function($scope, $location) {
    
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
	    	console.log("hi")
	    	 $location.path('/analysis').search('query', $scope.searchInput);
	       
	      }
 
}]);


