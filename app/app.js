// 'use strict';
//
// // Declare app level module which depends on views, and components
// var app = angular.module('myApp', [
//   'ngRoute',
//   'myApp.view1',
//   'myApp.view2',
//   'myApp.version'
// ]);
// app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
//   $locationProvider.hashPrefix('!');
//
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);
var app = angular.module("myApp", []);

// app.controller("title", function($scope) {
//     $scope.message = "List It";
// });

app.controller("dynamicFields", function($scope) {

    $scope.choices = [{id: 'choice1', name: 'choice1'}, {id: 'choice2', name: 'choice2'}, {id: 'choice3', name: 'choice3'}];

    $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length+1;
        $scope.choices.push({'id' : 'choice' + newItemNo, 'name' : 'choice' + newItemNo});
    };

    $scope.removeNewChoice = function() {
        var newItemNo = $scope.choices.length-1;
        if ( newItemNo !== 0 ) {
            $scope.choices.pop();
        }
    };

    $scope.showAddChoice = function(choice) {
        return choice.id === $scope.choices[$scope.choices.length-1].id;
    };

});