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
      
      // Temporary
      var counter = {
        "nyc": 0,
        "bangkok": 0,
        "delhi": 0,
        "paris": 0,
        "mexico city": 0
      };
      processSearchResults($scope.searchResults);
      // Process searchResults
      function processSearchResults(results) {
        for (var i = 0; i < results.length; i++) {
          var city = results[0].city;
          counter[city] += 1;
        }
        console.log(counter);
      }

	    function goToHomePage() {
	      $location.path('/').search('query', null);
	    }
	    
			function goToSearchPage() {
				if ($scope.searchInput.trim() === '') {
					return;
				}
				$location.path('/search').search('query', $scope.searchInput);
			}

			// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'City');
        data.addColumn('number', 'Tweet Count');
        data.addRows([
          ["nyc", counter["nyc"]],
          ["bangkok", counter["bangkok"]],
          ["delhi", counter["delhi"]],
          ["paris", counter["paris"]],
          ["mexico city", counter["mexico city"]]
        ]);

        // Set chart options
        var options = {'title':'Distribution of tweets by city',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
 
}]);


