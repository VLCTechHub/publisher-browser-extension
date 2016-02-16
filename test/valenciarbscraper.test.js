describe('ValenciaRbScraper', function(){
  it('reads information of a future event', function(done) {
    withFixture(valenciarbFixture, function(){
      var url = 'some url';
      var scrapper = new ValenciaRbScraper({'url': url});
      var result = scrapper.scrap();

      assert.equal(result.success,true);
      assert.equal(result.event.title,'Title goes here');
      assert.equal(result.event.description,'Description goes here......with some links!');
      assert.equal(result.event.datetime,'ISO Datetime goes here');
      assert.equal(result.event.hashtag,'@valenciarb');
      assert.equal(result.event.url,'some url');
    }, done);
  });

  it('does not read the event if it does not have a date', function(done){
    withFixture(valenciarbFixture, function() {
      var removeDate = function(){
        var time = document.querySelector('h2.scream time');
        time.removeAttribute('datetime');
      }
      removeDate();

      var scrapper = new ValenciaRbScraper();
      var result = scrapper.scrap();

      assert.equal(result.success,false);
      assert.equal(result.event, undefined);
    }, done);
  });
});
