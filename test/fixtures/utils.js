var eventbriteFixture = 'eventbrite.html';
var valenciarbFixture = 'valenciarb.html';
var meetupFixture = 'meetup.html';
var popupFixture = 'popup.html';

var withFixture = function(fixtureFile, runTest, done){
  fixture.setBase('test/fixtures');
  fixture.load(fixtureFile);
  runTest();
  fixture.cleanup();
  done();
}
