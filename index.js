/*
 *
 * Campaign Link Generator for UTM/ITM
 * Mozilla Public License
 * Version: 0.0.4
 *
 */

(function($){

/*
================
 INITIALIZATION
================
*/

const obj = {
	'url': '',
	'campaign': '',
	'sources': { // source table data
		'external': [ // utm_
			{
				'medium': 'email',
				'source': 'Campaigner'
			},
			{
				'medium': 'social',
				'source': 'Facebook'
			},
			{
				'medium': 'social',
				'source': 'Twitter'
			},
			{
				'medium': 'social',
				'source': 'Linkedin'
			}
		],
		'internal': [ // itm_
		/* not in use
			{
				'medium': 'website',
				'source': 'page area'
			}
		*/
		]
	},
	'links': [],
	'htmlOutput': ''
}

/*
================
 LINK GENERATOR
================
*/

$('#link-generator').click(function() {

	obj.url = document.getElementById('url-param-entry').value.toLowerCase();
	obj.campaign = document.getElementById('campaign-param-entry').value.replace(/[\s\?\&]/g, '_');
	obj.content = document.getElementById('content-param-entry').value;
	obj.term = document.getElementById('term-param-entry').value;
	obj.links = [];
	
	// loop external sources and add to links

	obj.sources.external.forEach(function(item) {

		let thisLink = obj.url + '?';
		if ( obj.campaign ) thisLink += 'utm_campaign=' + obj.campaign + '&';
		thisLink += 'utm_medium=' + item.medium + '&';
		thisLink += 'utm_source=' + item.source;
		if ( obj.content ) thisLink += '&utm_content=' + obj.content;
		if ( obj.term ) thisLink += '&utm_term=' + obj.term;
		
		obj.links.push(thisLink);

	});
	
	// loop internal sources and add to links

	obj.sources.internal.forEach(function(item) {

		let thisLink = obj.url + '?';
		if ( obj.campaign ) thisLink += 'itm_campaign=' + obj.campaign + '&';
		thisLink += 'itm_medium=' + item.medium + '&';
		thisLink += 'itm_source=' + item.source;
		if ( obj.term ) thisLink += '&itm_content=' + obj.content;
		if ( obj.term ) thisLink += '&itm_term=' + obj.term;
		
		obj.links.push(thisLink);

	});
	
	// loop link list and create copy buttons
	
	obj.htmlOutput = '';

	obj.links.forEach(function(link) {

        obj.htmlOutput += '<p>'
          +'<a href="#" class="copyURL btn btn-default" data-clipboard-text="'
          + link
          + '"> Copy </a> '
          + '<span class="URLdisplay">'
          + link
          + '</span></p>\n';
		  
	});

	$('#gen-result').html(obj.htmlOutput);

	// add URL copier event lister and handler
      clipboard = new ClipboardJS( '#gen-result .copyURL' );
      clipboard.on('success', function(e) {
        $( '#gen-result .copyURL' ).html( ' Copy ' );
        $( '#gen-result .copyURL' ).next().css( 'background','none' );
        $( e.trigger ).html( 'Copied' );
        $( e.trigger ).next().css( 'background-color','lightblue' );
      });


});

})(jQuery);
