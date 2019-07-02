/*
 *
 * Campaign Link Generator for UTM/ITM
 * Mozilla Public License
 * Version: 0.0.5
 *
 */

( function( $ ) {
    // entry and results object
    const ltObj = {
        'url': '',
        'campaign': '',
        'term': '',
        'source': '',
        'medium': '',
        'lcontent': '',
        'trackingLink': '',
        'htmlOutput': ''
    };

    // watch for changes in source select
    $( '#source-param-entry' ).change( function() {

        // collect data attributes
        ltObj.source = $( 'option:selected',this ).attr( 'data-source' );
        ltObj.medium = $( 'option:selected',this ).attr( 'data-medium' );

        // collect and validate text entries
        ltObj.url = $( '#url-param-entry' ).val().toLowerCase();
        ltObj.url = checkProtocol(ltObj.url);
        ltObj.campaign = validChars( $( '#campaign-param-entry' ) );
        ltObj.lcontent = validChars( $( '#content-param-entry' ) );
        ltObj.term = validChars( $( '#term-param-entry' ) );

        // generate links
        // @TODO: add error handling for empty required fields

        let thisLink = ltObj.url + '?';
        if ( ltObj.source == 'oshpd.ca.gov' ) {
            thisLink += 'itm_campaign=' + ltObj.campaign;
            thisLink += '&itm_source=' + ltObj.source;
            thisLink += '&itm_medium=' + ltObj.medium;
            if ( ltObj.lcontent ) thisLink += '&itm_content=' + ltObj.lcontent;
            if ( ltObj.term ) thisLink += '&itm_term=' + ltObj.term;
        } else {
            thisLink += 'utm_campaign=' + ltObj.campaign;
            thisLink += '&utm_source=' + ltObj.source;
            thisLink += '&utm_medium=' + ltObj.medium;
            if ( ltObj.lcontent ) thisLink += '&utm_content=' + ltObj.lcontent;
            if ( ltObj.term ) thisLink += '&utm_term=' + ltObj.term;
        }
        ltObj.trackingLink = thisLink;

        // link and copy button display
        ltObj.htmlOutput =
            '<p>' +
            '<span class="URLdisplay d-block p-2">' +
            ltObj.trackingLink +
            '</span> ' + 
            '<a href="#" onclick="return false;" class="copyURL btn btn-outline-dark mt-1" data-clipboard-text="' +
            ltObj.trackingLink +
            '"> Copy </a>' +
            '</p>';

        $('#generated-url').html(ltObj.htmlOutput);
    });

    function checkProtocol(iURL) {
        //force HTTPS compliance
        var pURL;
        if (!(iURL.search(/[^:\/\/]*$/) == 0)) {
            pURL = iURL.match(/[^:\/\/]*$/);
            pURL = 'https://' + pURL;

        } else if (!(iURL.search(/[^:\/\/]*$/) == 1)) {
            pURL = iURL;
            pURL = 'https://' + pURL;
        }
        return pURL;
    }

    function validChars( inputElement ) {
        return inputElement.val().replace( /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '' ).replace( /\s+/g, '_' );
    }

    $( '#generated-url' ).html( ltObj.htmlCopy );

    // add URL copier event lister and handler
    clipboard = new ClipboardJS('#generated-url .copyURL');
    clipboard.on('success', function(e) {
        $(e.trigger).html('Copied');
        $(e.trigger).prev().css('background-color', 'lightgreen');
        return false;
    });

})( jQuery );
