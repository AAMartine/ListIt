// Get the modal
var modalHelp = document.getElementById('myModalHelp');

// Get the button that opens the modal
var btnHelp = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var spanhelp = document.getElementsByClassName("close-help")[0];

// When the user clicks on the button, open the modal
btnHelp.onclick = function() {
	modalHelp.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanhelp.onclick = function() {
	modalHelp.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modalHelp) {
		modalHelp.style.display = "none";
	}
}
