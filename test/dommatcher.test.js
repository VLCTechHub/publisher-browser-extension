describe('DomMatcher', function(){

  beforeEach(function(done) {
    chrome.runtime.sendMessage.reset()
    done();
  });

  describe('matches the meetup dom', function(){
    it('sends a message for the background', function(done){
      withFixture(meetupFixture, function(){
        notifyEnableAddon();

        assert.ok(chrome.runtime.sendMessage.withArgs({enableAddon: true}).calledOnce);

        var element = document.querySelector('.groupHome-eventsList-upcomingEvents');
        element.parentNode.removeChild(element);

        notifyEnableAddon();
        assert.ok(chrome.runtime.sendMessage.withArgs({enableAddon: false}).calledOnce);
      }, done);
    });
  });

  describe('matches the eventbrite dom', function(){
    xit('sends a message for the background', function(done){
      withFixture(eventbriteFixture, function(){
        notifyEnableAddon();

        assert.ok(chrome.runtime.sendMessage.withArgs({enableAddon: true}).calledOnce);

        var element = document.querySelector('#event-page');
        element.parentNode.removeChild(element);

        notifyEnableAddon();
        assert.ok(chrome.runtime.sendMessage.withArgs({enableAddon: false}).calledOnce);
      }, done);
    });
  });

  describe('matches the valenciarb dom', function(){
    xit('sends a message for the background', function(done){
      withFixture(valenciarbFixture, function(){
        notifyEnableAddon();

        assert.ok(chrome.runtime.sendMessage.withArgs({enableAddon: true}).calledOnce);

        var element = document.querySelector('.eyelet');
        element.parentNode.removeChild(element);

        notifyEnableAddon();
        assert.ok(chrome.runtime.sendMessage.withArgs({enableAddon: false}).calledOnce);
      }, done);
    });
  });
});

