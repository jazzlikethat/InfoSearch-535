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

	    $scope.goToHomePage = goToHomePage;
			$scope.goToSearchPage = goToSearchPage;

	    function goToHomePage() {
	      $location.path('/').search('query', null);
	    }
	    
			function goToSearchPage() {
				if ($scope.searchInput.trim() === '') {
					return;
				}
				$location.path('/search').search('query', $scope.searchInput);
			}
 
}]);


