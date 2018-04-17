/*global listit, angular, Firebase */
'use strict';
/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebaseArray service
 * - exposes the model to the template and provides event handlers
 */
listIt.controller('listItCtrl', function listItCtrl($scope, $filter, $location, $firebaseObject, $firebaseArray, $anchorScroll){
	var ref= firebase.database().ref('places');
	// Bind the places to the firebase provider.
    $scope.places = $firebaseArray(ref);
    $scope.newPlace = '';
    $scope.editedPlace = null;
	$scope.placeTypes = ["Apartment", "Conference", "House", "Party", "Wedding Venue","University","Other"];
	$scope.dateVisited = new Date();
	$scope.emailContact = '';
	$scope.placeType='Apartment';

	$scope.gotoAnchor = function(x) {
		var newHash = x;
		if ($location.hash() !== newHash) {
			// set the $location.hash to `newHash` and
			// $anchorScroll will automatically scroll to it
			$location.hash(x);
		} else {
			// call $anchorScroll() explicitly,
			// since $location.hash hasn't changed
			$anchorScroll();
		}
	};
	$scope.$watch('places', function () {
        var total = 0;
        var remaining = 0;
        $scope.places.forEach(function (place) {
            // Skip invalid entries so they don't break the entire app.
            if (!place || !place.title) {
                return;
            }

            total++;
            if (place.completed === false) {
                remaining++;
            }
        });
        $scope.totalCount = total;
        $scope.remainingCount = remaining;
        $scope.completedCount = total - remaining;
        $scope.allChecked = remaining === 0;
    }, true);

    $scope.addPlace = function () {

		// (x === undefined) ? def_val : x

        var title = $scope.title.trim();
        var placeType = $scope.placeType;
		var price = ($scope.price === undefined) ? 0 : $scope.price;

		console.log($scope.address);
		var address = ($scope.address === undefined) ? '-' : $scope.address;
		console.log($scope.address);
		var dateVisited =($scope.dateVisited ===undefined) ? new Date().toDateString(): new Date($scope.dateVisited).toDateString();
		var dateValue = ($scope.dateVisited ===undefined) ? new Date().getTime():new Date($scope.dateVisited).getTime();
		var emailContact = ( $scope.emailContact == undefined) ? '-' : $scope.emailContact ;
		var telephone = ($scope.phone=== undefined) ? '-' : $scope.phone;
		var notes = ($scope.notes=== undefined) ? '-' : $scope.notes;
        $scope.places.$add({
            title: title,
			placeType: placeType,
			address: address,
			price: price,
			dateVisited: dateVisited,
			emailContact: emailContact,
			telephone: telephone,
			notes: notes,
            dateValue: dateValue
        });


        $scope.title ='';

		setTimeout(function() {
			location.reload(true);
		}, 1000);
    };

	$scope.searchPlace = function(textSearch) {
			var filtered = {};
			angular.forEach(input, function (place, id) {
				if(textSearch){
					var term= textsearch.toLowerCase();
					if (place.title.toLowerCase().indexOf(term) !=-1 ||place.placeType.toLowerCase().indexOf(term)!=-1 ) {
						filtered[id] = place;
					}
				} else {
					filtered[id] = place;
				}
			});
		$scope.selectedPlaces = filtered;
		};

    $scope.editPlace = function (place) {
        $scope.editedPlace = place;
        $scope.originalPlace = angular.extend({}, $scope.editedPlace);
    };

    $scope.doneEditing = function (place) {
        $scope.editedPlace = null;
        var title = place.title.trim();
        if (title) {
             $scope.places.$save(place);
        } else {
            $scope.removePlace(place);
        }
    };

    $scope.revertEditing = function (place) {
        place.title = $scope.originalPlace.title;
        $scope.doneEditing(place);
    };

    $scope.removePlace = function (placeId) {
    	var place = $scope.places.filter(function( obj ) {
			return obj.$id == placeId;
		});

		var result = confirm("Do you want to delete the place " + place[0].title + "?");
    	if (result) {
			$scope.places.$remove(place[0]);
			var delayInMilliseconds = 1000; //1 second
			setTimeout(function() {
				location.reload(true);
			}, delayInMilliseconds);
		}
    };
	document.addEventListener('click', function (e) {
		if(hasClass(e.target, 'fa-remove') ) {
				$scope.removePlace(e.path[2].children[1].value);
			}
	}, false);

	function hasClass(elem, className) {
		return elem.className.split(' ').indexOf(className) > -1;
	}

    $scope.clearCompletedPlaces = function () {
        $scope.places.forEach(function (place) {
            if (places.completed) {
                $scope.removePlace(place);
            }
        });
    };

    $scope.markAll = function (allCompleted) {
        $scope.places.forEach(function (place) {
            place.completed = allCompleted;
            $scope.places.$save(place);
        });
    };

    if ($location.path() === '') {
        $location.path('/');
    }
    $scope.location = $location
});
