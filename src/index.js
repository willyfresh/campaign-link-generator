/*
 *
 * Tracking Link Generator for UTM/ITM
 * 2018 Will Floyd (http://willfloyd.com)
 * Mozilla Public License
 * Version: 0.0.3
 *
 */

(function campaignLinkGenerator() { // IIFE aka "iffy"

	/*
	===============
	INITIALIZATION
	===============
	*/

	// source selection table variables

	clgSettings.sources.tables = {};
	clgSettings.sources.tables.external = [];
	clgSettings.sources.tables.internal = [];
	clgSettings.sources.tables.html = '';

	// link building variable

	clgSettings.link = {};


	// optional domain restriction, remove from settings to turn off
	// adds base url to input field

	if (clgSettings.domain) $('#url-param-entry').before('<div class="input-group-prepend"><span class="input-group-text" id="utm-base-url">' + clgSettings.domain + '</span></div>');

	// activate autocomplete for campaign names input
	// COMING SOON

	// source/medium arrays populated
	// two arrays are easier to iterate in next step

	for (const medium in clgSettings.sources.external) {
		clgSettings.sources.external[medium].forEach(function(source) {
			clgSettings.sources.tables.external.push([medium, source]);
		});
	}

	for (const medium in clgSettings.sources.internal) {
		clgSettings.sources.internal[medium].forEach(function(source) {
			clgSettings.sources.tables.internal.push([medium, source]);
		});
	}

	// populate sources table:

	{ // block scope to contain helper variables

		let rowCount = 0;
		let foreman = 0;

		// do > while loop to ensure the table at least gets one row

		do {
			clgSettings.sources.tables.html += '<tr><td>'

			// add external option to first column

			if (clgSettings.sources.tables.external[rowCount]) {
				let extLowerCase = clgSettings.sources.tables.external[rowCount][1].toString().toLowerCase();
				clgSettings.sources.tables.html += '<div class="form-check"><input class="form-check-input" type="radio" name="source-param-entry" id="source-' + extLowerCase + '" value="' + extLowerCase + '" data-scope="external" data-medium="' + clgSettings.sources.tables.external[rowCount][0] + '"><label class="form-check-label" for="source-' + extLowerCase + '">' + clgSettings.sources.tables.external[rowCount][1] + '</label></div>'
			}

			// elseif to display an error for an empty table
			// coming soon

			clgSettings.sources.tables.html += '</td><td>';

			// add internal option to second column

			if (clgSettings.sources.tables.internal[rowCount]) {
				let intLowerCase = clgSettings.sources.tables.internal[rowCount][1].toString().toLowerCase();
				clgSettings.sources.tables.html += '<div class="form-check"><input class="form-check-input" type="radio" name="source-param-entry" id="source-' + intLowerCase + '" value="' + intLowerCase + '" data-scope="internal" data-medium="' + clgSettings.sources.tables.internal[rowCount][0] + '"><label class="form-check-label" for="source-' + intLowerCase + '">' + clgSettings.sources.tables.internal[rowCount][1] + '</label></div>'
			}

			clgSettings.sources.tables.html += '</td></tr>';

			// helper variables
			// foreman checks next row and ends loop if there's no more sources

			rowCount++;
			foreman = 0;
			if (!clgSettings.sources.tables.external[rowCount]) foreman++;
			if (!clgSettings.sources.tables.internal[rowCount]) foreman++;
		}
		while (foreman < 2);

		// table inserted into DOM

		$('#source-param tbody').html(clgSettings.sources.tables.html);

	}

	// content and term are optional
	// to remove: add 'no' to settings object

	if (clgSettings.content === 'no') $('#content-param').remove();
	if (clgSettings.term === 'no') $('#term-param').remove();

	/*
	===============
	LINK GENERATOR
	===============
	*/

	// watches for click on link-generator button

	$('#link-generator').click(function() {

		// remove copyButton from DOM

		if ($('#copyButton')) $('#copyButton').remove();

		// capture url
		// url validation coming soon - limit characters

		clgSettings.link.url = clgSettings.domain + document.getElementById('url-param-entry').value.toLowerCase();

		// capture campaign name
		// 1st: validate that name exists

		clgSettings.link.campaign = document.getElementById('campaign-param-entry').value;

		// add source, medium and scope to link

		const fullSourceTable = clgSettings.sources.tables.external.concat(clgSettings.sources.tables.internal);

		// find out which radio button is checked
		// action for if nothing is checked coming soon

		fullSourceTable.forEach(function(source) {

			let sourceID = 'source-' + source[1].toLowerCase();

			if (document.getElementById(sourceID).checked) {

				clgSettings.link.source = document.getElementById(sourceID).value;
				clgSettings.link.medium = document.getElementById(sourceID).dataset.medium;
				clgSettings.link.scope = document.getElementById(sourceID).dataset.scope;

			}

		});

		// optional content field
		// validation and character limitation coming soon

		if (clgSettings.content != 'no') {
			clgSettings.link.content = document.getElementById('content-param-entry').value;
		}

		// optional term field
		// still hasn't been used yet

		if (clgSettings.term != 'no') {
			clgSettings.link.term = document.getElementById('term-param-entry').value;
		}

		// switch decides which url parameters to use
		// link is generated with appropriate parameters

		switch (clgSettings.link.scope) {

			case 'external':

				clgSettings.link.full = clgSettings.link.url + '?utm_campaign=' + clgSettings.link.campaign + '&utm_source=' + clgSettings.link.source + '&utm_medium=' + clgSettings.link.medium;
				if (clgSettings.content != 'no') clgSettings.link.full += '&utm_content=' + clgSettings.link.content;
				if (clgSettings.term != 'no') clgSettings.link.full += '&utm_term=' + clgSettings.link.term;
				break;

			case 'internal':

				clgSettings.link.full = clgSettings.link.url + '?itm_campaign=' + clgSettings.link.campaign + '&itm_source=' + clgSettings.link.source + '&itm_medium=' + clgSettings.link.medium;
				if (clgSettings.content != 'no') clgSettings.link.full += '&itm_content=' + clgSettings.link.content;
				if (clgSettings.term != 'no') clgSettings.link.full += '&itm_term=' + clgSettings.link.term;
				break;

			default:

				clgSettings.link.full = "ERROR";

		}

		$('#gen-result').html(clgSettings.link.full);

		// add copyButton to DOM

		$('#gen-buttons').append(' <button id="copyButton" class="btn btn-outline-primary" data-clipboard-text="' + clgSettings.link.full + '">Copy to Clipboard</button>');
		new ClipboardJS('#copyButton');

		console.log(clgSettings); // show me the object!

	});

}());