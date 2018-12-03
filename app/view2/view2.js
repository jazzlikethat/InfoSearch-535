'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$location', '$window', '$http', function($scope, $location, $window, $http) {
    $scope.searchInput = $location.search().query;
    $scope.searchResults = [];

    $scope.goToHomePage = goToHomePage;
    $scope.showAnalytics = showAnalytics;
    $scope.openUrl = openUrl;

    // Temp
    // Fetch raw tweets from a local file
    $http({
      url: "./raw_tweets.json",
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    .then(function(response){
      $scope.searchResults = response.data;
    });

    function goToHomePage() {
      $location.path('/').search('query', null);
    }
    
    function showAnalytics() {
    	$location.path('/analysis').search('query', $scope.searchInput);
    }

    function openUrl(url) {
      $window.open(url, '_blank');
    }
    
}]);
