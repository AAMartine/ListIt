
/*global angular *
/**
 * The main ListIt app module
 *
 * @type {angular.Module}
 */
'use strict';

var listIt = angular.module('listIt', ['firebase', 'ngRoute', 'ngResource']);

listIt.filter('listItFilter', function () {
    return function (input, textsearch) {
        var filtered = {};
        angular.forEach(input, function (place, id) {
			if(textsearch){
				var term= textsearch.toLowerCase();
				if (place.title.toLowerCase().indexOf(term) !=-1 ||place.placeType.toLowerCase().indexOf(term)!=-1 ) {
					filtered[id] = place;
			}
            } else {
                filtered[id] = place;
            }
        });
        return filtered;
    };
});


