'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$location', '$window', '$http', 'PagerService', 'sharedData', function($scope, $location, $window, $http, PagerService, sharedData) {
    
    $scope.searchInput = $location.search().query;
    $scope.searchResults = [];
    $scope.slicedResults = [];
    $scope.pager = {};
    
    $scope.goToHomePage = goToHomePage;
    $scope.showAnalytics = showAnalytics;
    $scope.openUrl = openUrl;
    $scope.setPage = setPage;

    // On load
    fetchTweets();

    function fetchTweets(){
      $http({
        url: "http://127.0.0.1:5000/query/" + $scope.searchInput,
        method: "GET",
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        $scope.searchResults = response.data.response.docs;
        sharedData.searchInput = $scope.searchInput;
        sharedData.searchResults = $scope.searchResults;
        $scope.setPage(1);
      });
    }

    function goToHomePage() {
      $location.path('/').search('query', null);
    }
    
    function showAnalytics() {
    	$location.path('/analysis').search('query', $scope.searchInput);
    }

    function openUrl(tweet) {
      var url = tweet["entities.urls.url"][0];
      $window.open(url, '_blank');
    }

    function setPage(page) {
      if (page < 1 || page === $scope.pager.currentPage || page > $scope.pager.totalPages) {
          return;
      }

      // get pager object from service
      $scope.pager = PagerService.GetPager($scope.searchResults.length, page);

      // get current page of items
      $scope.slicedResults = $scope.searchResults.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
      
      $window.scrollTo(0, 0);
    }
    
}]);
