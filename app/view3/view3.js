'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/analysis', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope', '$location', 'sharedData', function($scope, $location, sharedData) {
    
      $scope.searchInput = sharedData.searchInput;
      $scope.searchResults = sharedData.searchResults;

      if ($scope.searchResults.length === 0){
        goToHomePage();
        return;
      }

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

      google.charts.load('current', {'packages': ['geochart', 'corechart'], 'mapsApiKey': 'AIzaSyD536BKZ403PLJdOCFgC5Ccx-uuCk16NGo'});

      google.charts.setOnLoadCallback(drawAllCharts);

      function drawAllCharts() {
        drawRegionsMap();
        drawLanguageBarChart();
      }

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Country', 'Number of Tweets'],
          ['United States', $scope.searchResults.countries.usa],
          ['Thailand', $scope.searchResults.countries.thailand],
          ['France', $scope.searchResults.countries.france],
          ['India', $scope.searchResults.countries.india],
          ['Mexico', $scope.searchResults.countries.mexico]
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('chart_div1'));

        chart.draw(data, options);
      }

      function drawLanguageBarChart() {
        var data = google.visualization.arrayToDataTable([
          ["Language", "Tweets Count"],
          ["French", $scope.searchResults.languages.fr],
          ["English", $scope.searchResults.languages.en],
          ["Hindi", $scope.searchResults.languages.th],
          ["Thai", $scope.searchResults.languages.hi],
          ["Spanish", $scope.searchResults.languages.es]
        ]);
  
        var options = {
          title: 'Distribution of tweets by language',
          hAxis: {
            title: 'Total Tweets',
            minValue: 0
          },
          vAxis: {
            title: 'Language'
          }
        };
        var chart = new google.visualization.BarChart(document.getElementById("chart_div2"));
        chart.draw(data, options);
      }
 
}]);


