describe('MeetupScrapper', function(){
  it('reads information of a future event in Valencia', function(done) {  
    withMeetupFixture(function(){
      var url = 'some url';
      var scrapper = new MeetupScrapper({'url': url});
      var result = scrapper.scrap();
      
      assert.equal(result.success,true);
      assert.equal(result.event.title,'Title goes here');
      assert.equal(result.event.description,'Description goes here');
      assert.equal(result.event.datetime,'ISO Datetime goes here');
      assert.equal(result.event.url,'some url');
    }, done);
  });

  it('does not read the event if not in Valencia', function(done){
    withMeetupFixture(function() {
      var changeLocality = function(){
        document.querySelector('span.locality').innerText = 'Alicante';
      }
      changeLocality();
      
      var scrapper = new MeetupScrapper();
      var result = scrapper.scrap();
      
      assert.equal(result.success,false);
      assert.equal(result.event, undefined);
    }, done);
  });

  it('does not read the event if it does not have a date', function(done){
    withMeetupFixture(function() {
      var removeDate = function(){
        var time = document.querySelector('#event-when-display time');
        time.removeAttribute('datetime');
      }
      removeDate();

      var scrapper = new MeetupScrapper();
      var result = scrapper.scrap();
      
      assert.equal(result.success, false);
      assert.equal(result.event, undefined);
    }, done);
  });
});

describe('Content', function(){
  describe('on fetch message', function(){
    it('scraps the meetup page', function(done){
      withMeetupFixture(function(){
        var sender = sinon.spy();
        var sendResponse = sinon.spy();

        chrome.tabs.query.yields([{'url': 'some url'}]);
        chrome.runtime.onMessage.trigger({fetch:true}, sender, sendResponse);
        
        assert(sendResponse.calledOnce);
        var response = sendResponse.firstCall.args[0];
        assert.equal(response.success, true);
      }, done);
    });
  });
});


var withMeetupFixture = function(next, done){
  var FILENAME = 'test/fixtures/meetup.html';
  page.open(FILENAME, function() {
    page.injectJs('src/content.js');
    page.evaluate(next);
    done();
  });  
}