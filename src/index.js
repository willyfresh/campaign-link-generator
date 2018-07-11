/*!
 *
 * Tracking Link Generator for UTM/ITM
 * 2018 Will Floyd (http://willfloyd.com)
 * Mozilla Public License
 * Version: 0.0.2
 *
 */

/*
================================
initialization
to make the page ready to go
================================
*/
const initGenerator = function(){
	/*
	==========================================
	are domain restrictions in place?
	add domain to beginning of the url input
	==========================================
	*/
	if (settings.domain) $('#url-param-entry').before('<div class="input-group-prepend"><span class="input-group-text" id="utm-base-url">'+settings.domain+'</span></div>');
	/* 
	========================
	campaigns auto-complete
	coming soon
	tutorial saved***
	========================
	*/
	/*
	====================================================
	source/medium arrays generated: internal & external
	two arrays are easier to iterate in next step
	====================================================
	*/
	for (const medium in settings.sources.external) {
	settings.sources.external[medium].forEach(function(source) {
		extSourceTable.push([medium, source]);
	});
}
	// ===========================================================
	for(const medium in settings.sources.internal){
		settings.sources.internal[medium].forEach(function(source){
			intSourceTable.push([medium,source]);
		});
	}
	/*
	========================================
	iterating through the sourceTable arrays
	building the html table row by row
	foreman variable watches do/while loop
	foreman ends loop at end of both arrays
	printing into the table body
	========================================
	*/
	let sourceTableHTML = '';
	let rowCount=0;
	let foreman=0;

	do {
		sourceTableHTML += '<tr><td>'

		if (extSourceTable[rowCount]) {
			let extLowerCase=extSourceTable[rowCount][1].toString().toLowerCase();
			sourceTableHTML += '<div class="form-check"><input class="form-check-input" type="radio" name="source-param-entry" id="source-'+extLowerCase+'" value="'+extLowerCase+'" data-scope="external" data-medium="'+extSourceTable[rowCount][0]+'"><label class="form-check-label" for="source-'+extLowerCase+'">'+extSourceTable[rowCount][1]+'</label></div>'
		}

		sourceTableHTML += '</td><td>';

		if(intSourceTable[rowCount]){
			let intLowerCase=intSourceTable[rowCount][1].toString().toLowerCase();
			sourceTableHTML += '<div class="form-check"><input class="form-check-input" type="radio" name="source-param-entry" id="source-'+intLowerCase+'" value="'+intLowerCase+'" data-scope="internal" data-medium="'+intSourceTable[rowCount][0]+'"><label class="form-check-label" for="source-'+intLowerCase+'">'+intSourceTable[rowCount][1]+'</label></div>'
		}

		sourceTableHTML += '</td></tr>';

		foreman=0;
		if(!extSourceTable[rowCount+1]) foreman++;
		if(!intSourceTable[rowCount+1]) foreman++;
		rowCount++;
	}
	while(foreman<2);

	$('#source-param tbody').html(sourceTableHTML);
	/*
	=======================================
	content and term are totalllinktional
	to remove: add 'no' to settings object
	=======================================
	*/
	if (settings.content === 'no') $('#content-param').remove();
	if (settings.term === 'no') $('#term-param').remove();
}

/*
=========================================
link generator
validates the entries (added soon)
builds link based on form values
reveals the copy button
==========================================
*/
const generateLink = function(){
if ($('#copyButton')) $('#copyButton').remove(); // remove copyButton so there isn't two.

const linkURL = settings.domain + document.getElementById('url-param-entry').value.toLowerCase(); // mitigate url and backslash doubleups
const linkCampaign = document.getElementById('campaign-param-entry').value; // spaces to dashes, limit to dashes and alphanumeric
/* 
=========================================================
okay, using radio buttons isn't as easy as I had hoped.
if i want values from them, i have to refer to them by ID
example: #source-streamsend
then I can grab dataset and value from the input field

but first i need to identify which one is checked...
this means I need to test each one and return  
=========================================================
*/

// gotta scope these variables properly
let linkSource = '';
let linkMedium = '';
let linkScope = '';
let linkContent = '';
let linkTerm = '';

const fullSourceTable = extSourceTable.concat(intSourceTable);
fullSourceTable.forEach(function(source){
	let sourceID = 'source-'+source[1].toLowerCase();
	if(document.getElementById(sourceID).checked){
		linkSource = document.getElementById(sourceID).value;
		linkMedium = document.getElementById(sourceID).dataset.medium;
		linkScope = document.getElementById(sourceID).dataset.scope;
	}
});
if (settings.content != 'no') {
	linkContent = document.getElementById('content-param-entry').value; // spaces to dashes, limit to dashes and alphanumeric
}
if (settings.term != 'no'){
	linkTerm = document.getElementById('term-param-entry').value; // if I knew more about terms, I would probably develop something for it's text box.
}

let campaignLink = '';
switch(linkScope){
	case 'external':
		campaignLink = linkURL+'?utm_campaign='+linkCampaign+'&utm_source='+linkSource+'&utm_medium='+linkMedium;
		if (settings.content != 'no') campaignLink += '&utm_content='+linkContent;
		if (settings.term != 'no') campaignLink += '&utm_term='+linkTerm;
		break;
	case 'internal':
		campaignLink = linkURL+'?itm_campaign='+linkCampaign+'&itm_source='+linkSource+'&itm_medium='+linkMedium;
		if (settings.content != 'no') campaignLink += '&itm_content='+linkContent;
		if (settings.term != 'no') campaignLink += '&itm_term='+linkTerm;
		break;
	default:
		campaignLink = "ERROR";
}
$('#gen-result').html(campaignLink);

/*
================
add copy button
================
*/
$('#gen-buttons').append(' <button id="copyButton" class="btn btn-outline-primary" data-clipboard-text="'+campaignLink+'">Copy to Clipboard</button>');
new ClipboardJS('#copyButton');
}