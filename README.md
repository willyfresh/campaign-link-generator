# Campaign-Link-Generator
A Flexible Campaign Link Generator for using UTM and ITM links.

## Notes

### General Concept

Urchin links are  used universally to track traffic sources.
This generator simplifies creating urchin links using both external (utm_*) and internal (itm_*) methods of tracking.
Please note that [using ITM parameters requires additional setup in GTM and Analytics Settings](https://www.smashingmagazine.com/2017/08/tracking-internal-marketing-campaigns-google-analytics/#creating-custom-dimensions-in-google-analytics).
The campaign link generator will create campaign links for the user. 
The developer can modify parameters with a settings object.

### Specifications

#### Basic Functions

1. initializes the page using settings data from a global object
2. fetches form data and generates the urchin link

#### Upcoming Features

* validates form data - limits characters
* autocomplete suggestions for campaign names
* other small improvements (handling errors)

#### Dependencies

* bootstrap.js
* clipboard.js

### Setup

The developer will be able to create and customize the structure of the generator using a json object. This json object will live on the target page.

### Structure of the settings

The settings file defines the following:

* the base url (host name)
* campaign names available for suggestions
* internal and external mediums and sources
* toggles for optional parameters
