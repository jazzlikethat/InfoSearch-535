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

      google.charts.load('current', {'packages': ['geochart', 'corechart', 'wordtree'], 'mapsApiKey': 'AIzaSyD536BKZ403PLJdOCFgC5Ccx-uuCk16NGo'});

      google.charts.setOnLoadCallback(drawAllCharts);

      function drawAllCharts() {
        drawRegionsMap();
        drawLanguageBarChart();
        drawEmotionsChart();
        // drawWordTree();
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

        var options = {
          title: 'Distribution of tweets by location'
        };

        var chart = new google.visualization.GeoChart(document.getElementById('chart_div1'));

        chart.draw(data, options);
      }

      function drawLanguageBarChart() {
        var data = google.visualization.arrayToDataTable([
          ["Language", "Tweets (in %)"],
          ["French", $scope.searchResults.languages.fr],
          ["English", $scope.searchResults.languages.en],
          ["Hindi", $scope.searchResults.languages.th],
          ["Thai", $scope.searchResults.languages.hi],
          ["Spanish", $scope.searchResults.languages.es]
        ]);
  
        var options = {
          title: 'Distribution of tweets by language',
          hAxis: {
            title: 'Total Tweets by percentage',
            minValue: 0
          },
          vAxis: {
            title: 'Language'
          }
        };
        var chart = new google.visualization.BarChart(document.getElementById("chart_div2"));
        chart.draw(data, options);
      }

      function drawEmotionsChart() {
        var data = google.visualization.arrayToDataTable([
          ["Emotion", "Tweets (in %)"],
          ["Negative", $scope.searchResults.sentiments.overall_sentiment.neg],
          ["Neutral", $scope.searchResults.sentiments.overall_sentiment.neu],
          ["Positive", $scope.searchResults.sentiments.overall_sentiment.pos]
        ]);

        var options = {
          title: 'Distribution of tweets by Emotion',
          hAxis: {
            title: 'Total Tweets by percentage',
            minValue: 0
          },
          vAxis: {
            title: 'Emotion'
          }
        };
        var chart = new google.visualization.BarChart(document.getElementById("chart_div3"));
        chart.draw(data, options);
      }

      function getTextsArray() {
        var array = [['Phrases']];
        var tweets = $scope.searchResults.tweets;
        for (var i = 0; i < tweets.length; i++) {
          var entry = tweets[i];
          var text = entry['text_' + entry.tweet_lang];
          array.push([text]);
        }
        return array;
      }

      function drawWordTree() {
        var textArray = getTextsArray();
        var data = google.visualization.arrayToDataTable(textArray);

        var options = {
          wordtree: {
            format: 'implicit',
            word: $scope.searchInput
          }
        };

        var chart = new google.visualization.WordTree(document.getElementById('chart_div4'));
        chart.draw(data, options);
      }

      var completeTweetText = getTweetText();
      function getTweetText() {
        var text = "";
        for (var i = 0; i < $scope.searchResults.tweets.length; i++) {
          var entry = $scope.searchResults.tweets[i];
          var lang = entry.tweet_lang[0];
          text += entry['text_' + lang];
        }
        return text;
      }

      var myConfig = {
        type: 'wordcloud',
        options: {
          text: completeTweetText,
          minLength: 5,
          maxItems: 40,
          aspect: 'flow-center',
          rotate: true,
          colorType: 'palette',
          palette: ['#D32F2F','#5D4037','#1976D2','#E53935','#6D4C41','#1E88E5','#F44336','#795548','#2196F3','#EF5350','#8D6E63','#42A5F5'],
        
          style: {
            fontFamily: 'Crete Round',
          
            hoverState: {
              backgroundColor: '#D32F2F',
              borderRadius: 2,
              fontColor: 'white'
            },
            tooltip: {
              text: '%text: %hits',
              visible: true,
              
              alpha: 0.9,
              backgroundColor: '#1976D2',
              borderRadius: 2,
              borderColor: 'none',
              fontColor: 'white',
              fontFamily: 'Georgia',
              textAlpha: 1
            }
          }
        }
      }

      zingchart.render({ 
        id: 'chart_div4', 
        data: myConfig, 
        height: 400
      });
 
}]);


