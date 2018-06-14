var db = {
	'utm': {
		'name':'External Campaigns', // shows in tab at top
		'desc':'<a href="//en.wikipedia.org/wiki/UTM_parameters" target="_blank">Urchin Links</a> for tracking email, social and ad campaigns.',
		'base':'', // for restricting URL, leave blank if not restricting
		'form':
		[{
			'parameter':'URL',
			'label':'Website URL', // label for input field
			'caption':'The full website URL (e.g. <code>https://www.example.com</code>)', // help text
			'type':'url', // <input type="***">
			'restrictions':'', // regex include/exclude characters, length, ____ 
			''
		}],
		[{
			'parameter':'utm_campaign',
			'label':'Campaign Name', // label for input field
			'caption':'Product, promo code, or slogan (e.g. <code>spring-sale</code>)', // help text
			'type':'text', // <input type="***">
			'restrictions':'', // regex include/exclude characters, length, ____

		}],
		[{
			'label':'Campaign Name', // label for input field
			'caption':'Product, promo code, or slogan (e.g. <code>spring-sale</code>)', // help text
			'type':'text', // <input type="***">
			'parameters':'utm_campaign',
			'restrictions':'', // regex include/exclude characters, length, ____

		}],
	}
	[{

	}],
	[]
};