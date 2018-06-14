# Campaign-Link-Generator
A Flexible Campaign Link Generator for using UTM and ITM links.

## Notes

### General Concept

Urchin links are already used pretty universally to track traffic sources.
This generator simplifies creating urchin links using both external (utm_*) and internal (itm_*) methods of tracking.
Please note that using ITM parameters requires additional setup in GTM and Analytics Settings.
The campaign link generator will create campaign links for the user. 
The developer can modify parameters with a settings object.

#### Specifications

There are two functions:

1. initGenerator: puts hostname into form, [activates suggestions for campaign names,] builds table of sources, removes optional parameters
2. generateLink: fetches form data, validates form data, concatenates and displays the link, displays copy button

##### Dependencies

* bootstrap.js
* clipboard.js

### Setup

The developer will be able to create and customize the structure of the generator using a json object. This json object will live in a separate settings file.

### Structure of the settings

The settings file defines the following:

* the base url (host name)
* campaign names available for suggestions
* internal and external mediums and sources
* toggles for optional parameters
