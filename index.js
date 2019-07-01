================
 INITIALIZATION
================
*/


ltObj = {
    'url': '',
    'campaign': '',
    'term': '',
    'd_attribute': [],
    'htmlOutput': [],
    'htmlCopy': ''
};
//force HTTPS compliance
function checkProtocol(iURL) {
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

function GenerateLinks() {

    ltObj.d_attribute = [];
    ltObj.htmlOutput = [];
    ltObj.htmlCopy = '';
//Checkbox Listener - Push HTML Custom attr data in
    $("#link-param").find("input[type=checkbox]").each(function() {

        if ($(this).is(":checked")) {
            var d_source = $(this).attr('data-source');
            $(this).attr('data-source');
            var d_medium = $(this).attr('data-medium');
            ltObj.d_attribute.push({
                "d_source": d_source,
                "d_medium": d_medium
            });
        }
    });
//text validation for each entry
    ltObj.url = $('#url-param-entry').val().toLowerCase();
    ltObj.url = checkProtocol(ltObj.url);
    ltObj.campaign = $('#campaign-param-entry').val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g, '_');
    //$('#campaign-param-entry').validateField();
    ltObj.content = $('#content-param-entry').val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g, '_');
    ltObj.term = $('#term-param-entry').val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g, '_');

//Generate links
    ltObj.d_attribute.forEach(function(element) {

        thisLink = ltObj.url + '?';
        if (element.d_source == 'Internal') {
            if (ltObj.campaign) thisLink += 'itm_campaign=' + ltObj.campaign + '&';
            thisLink += 'itm_source=' + element.d_source + '&';
            thisLink += 'itm_medium=' + element.d_medium;

            if (ltObj.content) thisLink += '&itm_content=' + ltObj.content;
            if (ltObj.term) thisLink += '&itm_term=' + ltObj.term;
        } else {
            if (ltObj.campaign) thisLink += 'utm_campaign=' + ltObj.campaign + '&';
            thisLink += 'utm_source=' + element.d_source + '&';
            thisLink += 'utm_medium=' + element.d_medium;

            if (ltObj.content) thisLink += '&utm_content=' + ltObj.content;
            if (ltObj.term) thisLink += '&utm_term=' + ltObj.term;
        }
        console.log(element.d_source);
        ltObj.htmlOutput.push(thisLink);
    });

//URL HTML generator 
    ltObj.htmlOutput.forEach(function(link) {
        ltObj.htmlCopy += '<p>'+
            '<a href="#" class="copyURL btn btn-default" data-clipboard-text="' +
            link +
            '"> Copy </a> ' +
            '<span class="URLdisplay">' +
            link +
            '</span></p>\n';
    });
    $('#gen-result').html(ltObj.htmlCopy);
}

$('#gen-result').html(ltObj.htmlCopy);

// add URL copier event lister and handler
clipboard = new ClipboardJS('#gen-result .copyURL');
clipboard.on('success', function(e) {
    $('#gen-result .copyURL').html(' Copy ');
    $('#gen-result .copyURL').next().css('background', 'none');
    $(e.trigger).html('Copied');
    $(e.trigger).next().css('background-color', 'lightgreen');
});

$("#link-param").find("input[type=checkbox]").click(function() {
    GenerateLinks();
})
