

// Get the type modal
var modalTypeHelp = document.getElementById('sortTypeModal');

// Get the <span> element that closes the modal
var spanTypehelp = document.getElementById("closeType-help");

// Get the price modal
var modalPriceHelp = document.getElementById('sortPriceModal');

// Get the <span> element that closes the modal
var spanPricehelp = document.getElementById("closePrice-help");

// Get the price range modal
var modalRangeHelp = document.getElementById('sortRangeModal');

// Get the <span> element that closes the modal
var spanRangehelp = document.getElementById("closeRange-help");

// Get the date modal
var modalDateHelp = document.getElementById('sortDateModal');

// Get the <span> element that closes the modal
var spanDatehelp = document.getElementById("closeDate-help");

// When the user clicks on the button, open the modal
document.addEventListener('click', function (e) {
	if(hasClass(e.target).indexOf('type-sort') > -1 ) {
		modalTypeHelp.style.display = "block";
	}
	if(hasClass(e.target).indexOf('price-sort') > -1 ) {
		modalPriceHelp.style.display = "block";
	}
	if(hasClass(e.target).indexOf('range-sort') > -1) {
		modalRangeHelp.style.display = "block";
	}
	if(hasClass(e.target).indexOf('date-sort') > -1 ) {
		modalDateHelp.style.display = "block";
	}

}, false);
function hasClass(elem) {
	if (elem.id)
	  	return elem.id;
	else
		return elem.className.split(' ');
}

// When the user clicks on <span> (x), close the modal
spanTypehelp.onclick = function() {
	modalTypeHelp.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modalTypeHelp) {
		modalTypeHelp.style.display = "none";
	}
}

spanPricehelp.onclick = function() {
	modalPriceHelp.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modalPriceHelp) {
		modalPriceHelp.style.display = "none";
	}
}

spanRangehelp.onclick = function() {
	modalRangeHelp.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modalRangeHelp) {
		modalRangeHelp.style.display = "none";
	}
}

spanDatehelp.onclick = function() {
	modalDateHelp.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modalDateHelp) {
		modalDateHelp.style.display = "none";
	}
}
