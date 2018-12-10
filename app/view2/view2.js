'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$location', '$window', '$http', 'PagerService', 'sharedData', '$timeout', function($scope, $location, $window, $http, PagerService, sharedData, $timeout) {
    
    $scope.searchInput = $location.search().query;
    $scope.searchResults = [];
    $scope.slicedResults = [];
    $scope.pager = {};
    $scope.hideSpinner = true;
    $scope.filters = {
      language: null,
      city: null,
      date: null
    };
    
    $scope.goToHomePage = goToHomePage;
    $scope.fetchResultsForQuery = fetchTweets;
    $scope.showAnalytics = showAnalytics;
    $scope.openUrl = openUrl;
    $scope.setPage = setPage;
    $scope.gotoUser = gotoUser;
    $scope.applyFilters = applyFilters;
    $scope.clearFilters = clearFilters;

    var script_ip = "18.188.21.89";
    var script_port = "5000";
    var tempTweets = [];

    // On load
    fetchTweets();

    function fetchTweets(){
      if ($scope.searchInput.trim() === '') {
        return;
      }
      $scope.pager = {};
      $scope.hideSpinner = false;
      $scope.filters.language = null;
      $scope.filters.city = null;
      $http({
        url: "http://" + script_ip + ":" + script_port + "/query/" + $scope.searchInput,
        method: "GET",
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        $scope.searchResults = response.data;
        sharedData.searchInput = $scope.searchInput;
        sharedData.searchResults = $scope.searchResults;
        tempTweets = angular.copy($scope.searchResults.tweets);
        $scope.setPage(1);
        $scope.hideSpinner = true;
      })
      .catch(function(){
        $scope.searchResults = {
          tweets: []
        };
        $scope.setPage(1);
        $scope.hideSpinner = true;
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

    function applyFilters() {
      $scope.pager = {};
      $scope.hideSpinner = false;
      $scope.searchResults.tweets = angular.copy(tempTweets);
      if ($scope.filters.language) {
        var tweets = $scope.searchResults.tweets;
        $scope.searchResults.tweets = tweets.filter(function(tweet){
          return tweet.tweet_lang[0] === $scope.filters.language;
        });
      }
      if ($scope.filters.city) {
        var tweets = $scope.searchResults.tweets;
        $scope.searchResults.tweets = tweets.filter(function(tweet){
          return tweet.city[0] === $scope.filters.city;
        })
      }
      $scope.setPage(1);
      $timeout(function(){
        $scope.hideSpinner = true;
      }, 500);
    }

    function clearFilters() {
      $scope.hideSpinner = false;
      $scope.filters.language = null;
      $scope.filters.city = null;
      $scope.pager = {};
      $scope.searchResults.tweets = angular.copy(tempTweets);
      $scope.setPage(1);
      $timeout(function(){
        $scope.hideSpinner = true;
      }, 500);
    }
    
}]);
