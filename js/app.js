
/*global angular *
/**
 * The main ListIt app module
 *
 * @type {angular.Module}
 */
'use strict';

var listIt = angular.module('listIt', ['firebase', 'ngRoute', 'ngResource']);

listIt.filter('listItFilter', function ($location) {
    return function (input) {
        var filtered = {};
        angular.forEach(input, function (todo, id) {
            var path = $location.path();
            if (path === '/active') {
                if (!todo.completed) {
                    filtered[id] = todo;
                }
            } else if (path === '/completed') {
                if (todo.completed) {
                    filtered[id] = todo;
                }
            } else {
                filtered[id] = todo;
            }
        });
        return filtered;
    };
});

