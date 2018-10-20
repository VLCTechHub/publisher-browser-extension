describe('EventbriteScraper', function(){
  it('reads information of a future event in Valencia', function(done) {
    withFixture(eventbriteFixture, function(){
      var url = 'some url';
      var scrapper = new EventbriteScraper({'url': url});
      var result = scrapper.scrap();

      assert.equal(result.success,true);
      assert.equal(result.event.title,'Title goes here');
      assert.include(result.event.description, 'Description. 1st parragraph.');
      assert.include(result.event.description, 'Description. 2nd parragraph.');
      assert.equal(result.event.datetime,'2017-12-15T18:00:00+01:00');
      assert.equal(result.event.hashtag,'@mytwitter');
      assert.equal(result.event.url,'some url');
    }, done);
  });

  it('does not read the event if not in Valencia', function(done){
    withFixture(eventbriteFixture, function() {
      var changeLocality = function(){
        document.querySelector('.-test-address').innerText = 'Alicante';
      }
      changeLocality();

      var scrapper = new EventbriteScraper();
      var result = scrapper.scrap();

      assert.equal(result.success,false);
      assert.equal(result.event, undefined);
    }, done);
  });
});
