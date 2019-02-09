describe('Content', function(){
  describe('on fetch message', function(){
    it('scraps the meetup page', function(done){
      withFixture(meetupFixture, function(){
        var sender = sinon.spy();
        var sendResponse = sinon.spy();

        chrome.tabs.query.yields([{'url': 'https://www.meetup.com/foo/bar'}]);
        chrome.runtime.onMessage.trigger({fetch:true, url: 'https://www.meetup.com/foo/bar'}, sender, sendResponse);

        assert(sendResponse.calledOnce);
        var response = sendResponse.firstCall.args[0];
        assert.equal(response.success, true);
      }, done);
    });

    xit('scraps the eventbrite page', function(done){
      withFixture(eventbriteFixture, function(){
        var sender = sinon.spy();
        var sendResponse = sinon.spy();

        chrome.tabs.query.yields([{'url': 'https://www.eventbrite.es/foo/bar'}]);
        chrome.runtime.onMessage.trigger({fetch:true, url: 'https://www.eventbrite.es/foo/bar'}, sender, sendResponse);

        assert(sendResponse.calledOnce);
        var response = sendResponse.firstCall.args[0];
        assert.equal(response.success, true);
      }, done);
    });

    it('scraps valenciarb page', function(done){
      withFixture(valenciarbFixture, function(){
        var sender = sinon.spy();
        var sendResponse = sinon.spy();

        chrome.tabs.query.yields([{'url': 'http://valenciarb.org/'}]);
        chrome.runtime.onMessage.trigger({fetch:true, url: 'http://valenciarb.org/'}, sender, sendResponse);

        assert(sendResponse.calledOnce);
        var response = sendResponse.firstCall.args[0];
        assert.equal(response.success, true);
      }, done);
    });
  });
});
