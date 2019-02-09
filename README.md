# VLCTechHub Browser Extension

[![Build Status](https://travis-ci.org/VLCTechHub/chrome-addon.svg?branch=master)](https://travis-ci.org/VLCTechHub/publisher-browser-extension)

VLCTechHub Browser extension to publish events in VLCTechHub with details read from the site you are visiting.

Sites supported:
 - Event detail page from [www.meetup.com](https://www.meetup.com/)
 - Event detail page from [www.eventbrite.es](https://eventbrite.es/)
 - Event in front page from [valenciarb.org](https://valenciarb.org)

Events must have a future date and be held in Valencia region.

## How to use it

### Chrome

You can install the [official version](https://chrome.google.com/webstore/detail/vlctechhub-publisher-addo/jmphppchcbgfglglfbemgbjligclmcmc).

To install the dev version:
 - `git clone https://github.com/VLCTechHub/publisher-browser-extension
.git`
 - `cd publisher-browser-extension`
 - `npm install`
 - Open `chrome://extensions/` with Chrome
 - Ensure that the "Developer mode" checkbox in the top right-hand corner is checked
 - Click "LOAD UNPACKED" and select `src` folder from this repo
 - Visit a meetup event page with a future event in Valencia


### Firefox

To install the dev version:
 - `git clone https://github.com/VLCTechHub/publisher-browser-extension
.git`
 - `cd publisher-browser-extension`
 - `npm install`
 - open Firefox
 - enter "about:debugging" in the URL bar
 - check the box labelled "Enable add-on debugging"
 - click the button labelled "Load Temporary Add-on"
 - select the file manifest.json in the src folder
 - visit a meetup event page with a future event in Valencia

## tests

To run the test run `npm test` on the project folder.

--

