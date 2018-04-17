var placeSearch, autocomplete;
var componentForm = {
	street_number: 'short_name',
	route: 'long_name',
	locality: 'long_name',
	administrative_area_level_1: 'short_name',
	country: 'long_name',
	postal_code: 'short_name'
};

function initAutocomplete() {
	// Create the autocomplete object, restricting the search to geographical
	// location types.
	autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
		{types: ['geocode']});

	// When the user selects an address from the dropdown, populate the address
	// fields in the form.
	autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
	var appElement = document.querySelector('[ng-app=listIt]');
	var $scope = angular.element(appElement).scope();
	$scope = $scope.$$childHead; // add this and it will work

	// Get the place details from the autocomplete object.
	var place = autocomplete.getPlace();
	$scope.$apply(function() {
		$scope.address =   place.formatted_address;
	});


    document.getElementById('autocomplete').value = place.formatted_address;
}

function myFunction() {
	var x = document.getElementById("myMenu");
	if (x.className === "menu") {
		x.className += " responsive";
	} else {
		x.className = "menu";
	}
}
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var circle = new google.maps.Circle({
				center: geolocation,
				radius: position.coords.accuracy
			});
			autocomplete.setBounds(circle.getBounds());
		});
	}
}
