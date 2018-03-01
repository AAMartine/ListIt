/*global listit, angular, Firebase */
'use strict';
/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebaseArray service
 * - exposes the model to the template and provides event handlers
 */
listIt.controller('listItCtrl', function listItCtrl($scope, $filter, $location, $firebaseObject, $firebaseArray){
	var ref= firebase.database().ref('places');
	// Bind the places to the firebase provider.
    $scope.places = $firebaseArray(ref);
    $scope.newPlace = '';
    $scope.editedPlace = null;
	$scope.placeTypes = ["Apartment", "Conference", "House", "Party", "Wedding Venue","University","Other"];
	$scope.dateVisited = new Date();
	$scope.emailContact = "myname@example.com";

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
        var title = $scope.title.trim();
        var placeType = $scope.placeType;
		var price = $scope.price;
		var address = $scope.address;
		var dateVisited = new Date($scope.dateVisited).toDateString();
		var dateValue = new Date($scope.dateVisited).getTime();
		var emailContact = $scope.emailContact;
		var telephone = $scope.phone;
		var notes = $scope.notes;
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
			alert("Deleting.....");
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
