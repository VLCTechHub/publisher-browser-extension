# VLCTechHub Chrome Extension

VLCTechHub Chrome extension to publish events in VLCTechHub with details read from the site you are visiting.

Sites supported:
 - Event detail page from www.meetup.com
 - Event detail page from www.eventbrite.es
 - Event in front page from valenciarb.org

Events must have a future date and be held in Valencia region.

## How to use it

You can install the [official version](https://chrome.google.com/webstore/detail/vlctechhub-publisher-addo/jmphppchcbgfglglfbemgbjligclmcmc).

To install the dev version:
 - `git clone https://github.com/VLCTechHub/chrome-addon.git`
 - `cd chrome-addon`
 - `npm install`
 - open chrome -> settings -> extensions -> enable dev mode
 - add an extension, select `src` folder from this repo
 - visit a meetup event page with a future event in Valencia


To run the test run `npm test` on the project folder.

--

[![Build Status](https://travis-ci.org/VLCTechHub/chrome-addon.svg?branch=master)](https://travis-ci.org/VLCTechHub/chrome-addon)
