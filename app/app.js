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




app.controller('addItemController', ['$scope', function($scope) {

    $scope.items = [];

    $scope.addItem = function() {
        $scope.items.push({'name': $scope.newItemName, 'done':false})
        $scope.items.push({'address': $scope.newItemAddress, 'done':false})
        $scope.items.push({'email': $scope.newItemEmail, 'done':false})
        $scope.items.push({'tel': $scope.newItemTel, 'done':false})
        $scope.items.push({'description': $scope.newItemDescription, 'done':false})
        $scope.newItemName = ''
        $scope.newItemAddress = ''
        $scope.newItemEmail = ''
        $scope.newItemTel = ''
        $scope.newItemDescription = ''
    }

    $scope.deleteItem = function(index) {
        $scope.items.splice(index, 1);
    }
}]);














