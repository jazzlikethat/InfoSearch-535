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
    $scope.fetchResultsForQuery = fetchTweets;
    $scope.showAnalytics = showAnalytics;
    $scope.openUrl = openUrl;
    $scope.setPage = setPage;
    $scope.gotoUser = gotoUser;

    var script_ip = "18.188.21.89";
    var script_port = "5000";

    // On load
    fetchTweets();

    function fetchTweets(){
      $scope.pager = {};
      $http({
        url: "http://" + script_ip + ":" + script_port + "/query/" + $scope.searchInput,
        method: "GET",
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        $scope.searchResults = response.data;
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
      var url = "https://twitter.com/" + tweet.user_name[0] + "/status/" + tweet.tweet_id;
      $window.open(url, '_blank');
    }
	
	  function gotoUser(tweet) {
      var url = tweet.user_name[0];
      $window.open("https://twitter.com/"+url, '_blank');
    }

    function setPage(page) {
      if (page < 1 || page === $scope.pager.currentPage || page > $scope.pager.totalPages) {
          return;
      }

      // get pager object from service
      $scope.pager = PagerService.GetPager($scope.searchResults.tweets.length, page);

      // get current page of items
      $scope.slicedResults = $scope.searchResults.tweets.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
      
      $window.scrollTo(0, 0);
    }
    
}]);
