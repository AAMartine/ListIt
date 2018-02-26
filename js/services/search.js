var client = algoliasearch('TKQ0MXPBU5', '48a167ccc2a2912194f2ad2957ad0e22');
var index = client.initIndex('places');


index.setSettings({
	searchableAttributes: [
		'placeType',
		'address',
		'dateVisited',
		'emailContact',
		'telephone',
		'notes',
		'price',
		'title',
		'dateValue',
		'objectID'
	],
});


var search = instantsearch({
	// Replace with your own values
	appId: 'TKQ0MXPBU5',
	apiKey: '48a167ccc2a2912194f2ad2957ad0e22', // search only API key, no ADMIN key
	indexName: 'places',
	urlSync: true,
	searchParameters: {
		hitsPerPage: 10
	}
});

/*var priceAscIndex = client.initIndex('places_price_asc');
priceAscIndex.setSettings({
	ranking: [
		'asc(price)',
		'typo',
		'geo',
		'words',
		'proximity',
		'attribute',
		'exact',
		'custom',
	],
});*/

var search = instantsearch({
	// Replace with your own values
	appId: 'TKQ0MXPBU5',
	apiKey: '48a167ccc2a2912194f2ad2957ad0e22', // search only API key, no ADMIN key
	indexName: 'places',
	urlSync: true,
	searchParameters: {
		hitsPerPage: 10
	}
});

search.addWidget(
	instantsearch.widgets.searchBox({
		container: '#search-input',
		placeholder: 'Search for products'
	})
);

search.addWidget(
	instantsearch.widgets.hits({
		container: '#hits',
		templates: {
			item: document.getElementById('hit-template').innerHTML,
			empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
		}
	})
);

// Add this after the other search.addWidget() calls
search.addWidget(
	instantsearch.widgets.pagination({
		container: '#pagination',
		scrollTo: '#search-input',
	})
);


search.addWidget(
	instantsearch.widgets.stats({
		container: '#stats',
	})
);
search.addWidget(
	instantsearch.widgets.refinementList({
		container: '#type',
		attributeName: 'placeType',
		autoHideContainer:true,
		limit: 5,
		showMore: {
			limit: 10,
		},
		templates: {
			header: getHeader('Type'),
		},
		collapsible: {
			collapsed: false,
		},
	})
);

search.addWidget(
	instantsearch.widgets.rangeSlider({
		container: '#priceTitle',
		attributeName: 'price',
		tooltips: {
			format: function (rawValue) {
				return '$' + Math.round(rawValue).toLocaleString();
			},
		},
		templates: {
			header: getHeader('Price'),
			empty: "We didn't find any results for the search <em>\"{{query}}\"</em>",
		},
		collapsible: {
			collapsed: false,
		},
	})
);
search.addWidget(
	instantsearch.widgets.clearAll({
		container: '#clear-all',
		templates: {
			link: 'Clear search'
		},
		autoHideContainer: false,
		clearsQuery: true,
	})
);
search.addWidget(
	instantsearch.widgets.numericRefinementList({
		container: '#date',
		attributeName: 'dateValue',
		options: [
			{name: 'All'},
			{start:new Date().getTime()- (7 * 24 * 60 * 60 * 1000),  end:new Date().getTime(), name: 'This week'},
			{start:new Date().getTime()- (30 * 24 * 60 * 60 * 1000),  end:new Date().getTime(), name: 'This month'},
			{start:new Date().getTime()- (180 * 24 * 60 * 60 * 1000),  end:new Date().getTime(), name: 'Last six month'},
			{start:new Date().getTime()- (365 * 24 * 60 * 60 * 1000),  end:new Date().getTime(), name: 'This year'},
		],
templates: {
	header: getHeader('Date visited'),
	empty: "We didn't find any results for the search"
},
collapsible: {
	collapsed: false,
},
})
);

search.addWidget(
	instantsearch.widgets.currentRefinedValues({
		container: '#active-filters',
		clearAll: 'after',
		clearsQuery: true,
		attributes: [
			{name: 'placeType', label: 'Type'},
			{name: 'price', label: 'Price'},
		],
		onlyListedAttributes: true,
	})
);

search.addWidget(
	instantsearch.widgets.priceRanges({
		container: '#price-range',
		attributeName: 'price',
		labels: {
			currency: '$',
			separator: 'to',
			button: 'Apply',
		},
		templates: {
			header: getHeader('Price range'),
			empty: "We didn't find any results for the search"
		},
		collapsible: {
			collapsed: false,
		},
	})
);
/*search.addWidget(
	instantsearch.widgets.sortBySelector({
		container: '#sort-by',
		autoHideContainer: true,
		indices: [
			{
				name: index,
				label: 'Most relevant',
			},
			{
				name: '${index}_dateVisited_desc',
				label: 'Most recent places',
			},
			{
				name: '${index}_dateVisited_asc',
				label: 'Oldest visits',
			},
			{
				name: '${index}_price_asc',
				label: 'Lowest price',
			},
			{
				name: '${index}_price_desc',
				label: 'Highest price',
			},

		],
	})
);*/
function getTemplate(templateName) {
	return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
	return `<h5>${title}</h5>`;
}

search.start();
