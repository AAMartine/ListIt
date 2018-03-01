var modal = document.getElementById('form');

// Get the <span> element that closes the modal
var spanClose = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
spanClose.onclick = function() {
	modal.style.display = "none";
	alert("Refreshing....");
	var delayInMilliseconds = 1000; //1 second
	setTimeout(function() {
		location.reload(true);
	}, delayInMilliseconds);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

