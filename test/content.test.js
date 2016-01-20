describe('Content', function(){
  describe('on fetch message', function(){
    it('scraps the meetup page', function(done){
      withFixture(meetupFixture, function(){
        var sender = sinon.spy();
        var sendResponse = sinon.spy();

        chrome.tabs.query.yields([{'url': 'http://www.meetup.com/foo/bar'}]);
        chrome.runtime.onMessage.trigger({fetch:true, url: 'http://www.meetup.com/foo/bar'}, sender, sendResponse);

        assert(sendResponse.calledOnce);
        var response = sendResponse.firstCall.args[0];
        assert.equal(response.success, true);
      }, done);
    });
  });
});
