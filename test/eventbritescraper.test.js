describe('EventbriteScraper', function(){
  it('reads information of a future event in Valencia', function(done) {
    withFixture(eventbriteFixture, function(){
      var url = 'some url';
      var scrapper = new EventbriteScraper({'url': url});
      var result = scrapper.scrap();

      assert.equal(result.success,true);
      assert.equal(result.event.title,'Title goes here');
      assert.equal(result.event.description,'Description. 1st parragraph.\n\nDescription. 2nd parragraph.\n\n');
      assert.equal(result.event.datetime,'ISO Datetime goes here');
      assert.equal(result.event.hashtag,'@handler');
      assert.equal(result.event.url,'some url');
    }, done);
  });

  it('does not read the event if not in Valencia', function(done){
    withFixture(eventbriteFixture, function() {
      var changeLocality = function(){
        document.querySelector('#panel_when meta[itemprop="addressLocality"]').setAttribute('content','Alicante');
        document.querySelector('#panel_when meta[itemprop="addressRegion"]').setAttribute('content','Alicante');
      }
      changeLocality();

      var scrapper = new EventbriteScraper();
      var result = scrapper.scrap();

      assert.equal(result.success,false);
      assert.equal(result.event, undefined);
    }, done);
  });
});
