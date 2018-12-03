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
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
 
}]);


