(function() {
    'use strict';

    angular.module('myApp')
        .factory('sharedData', sharedData);

    function sharedData() {
        
        // service definition
        var searchInput = [];
        var searchResults = [];

        return {
            searchInput: searchInput,
            searchResults: searchResults
        };
    }

})();