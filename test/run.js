/**
 * Test runner
 * Using phantomjs to render page and execute scripts
 *
 * Example: phantomjs test/run.js
 */

var node_modules = '../node_modules/';
phantom.injectJs(node_modules + 'mocha/mocha.js');
phantom.injectJs(node_modules + 'sinon-chrome/src/phantom-tweaks.js');
phantom.injectJs(node_modules + 'chai/chai.js');
phantom.injectJs(node_modules + 'sinon/pkg/sinon.js');

mocha.setup({ui: 'bdd', reporter: 'spec'});
phantom.injectJs('beforeeach.js');
phantom.injectJs('meetupscraper.test.js');
phantom.injectJs('eventbritescraper.test.js');
phantom.injectJs('valenciarbscraper.test.js');
phantom.injectJs('content.test.js');
phantom.injectJs('popup.test.js');

var assert = chai.assert;
var meetupFixture = 'test/fixtures/meetup.html';
var eventbriteFixture = 'test/fixtures/eventbrite.html';
var valenciarbFixture = 'test/fixtures/valenciarb.html';

var withFixture = function(fixture, next, done){
  page.open(fixture, function() {
    page.injectJs('src/js/scrapers/meetupscraper.js');
    page.injectJs('src/js/scrapers/eventbritescraper.js');
    page.injectJs('src/js/scrapers/valenciarbscraper.js');
    page.injectJs('src/js/content.js');
    page.evaluate(next);
    done();
  });
}

mocha.run(function(failures) {
  // setTimeout is needed to supress "Unsafe JavaScript attempt to access..."
  // see https://github.com/ariya/phantomjs/issues/12697
  setTimeout(function() {
    phantom.exit(failures);
  }, 0);
});