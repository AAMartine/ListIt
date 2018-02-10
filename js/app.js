
/*global angular *
/**
 * The main ListIt app module
 *
 * @type {angular.Module}
 */
'use strict';

var listIt = angular.module('listIt', ['firebase', 'ngRoute']);

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

listIt.config(function ($routeProvider) {

     $routeProvider
        .when('/',{
               templateUrl: firebase-login/login.html,
               controller: listItCtrl
        })
        .when('/addplace', {
            templateUrl: app/addPlace/add.html,
            controller: listItCtrl
        })
        .otherwise({
            redirectTo: '/'
        });
});
