describe('Decharlas', function(){
  it('reads information of a future event in Decharlas', function(done) {
    withFixture(decharlasFixture, function(){
      var url = 'some url';
      var scrapper = new DecharlasScraper({'url': url});
      var result = scrapper.scrap();

      assert.equal(result.success,true);
      assert.equal(result.event.title,'Cómo proteger mi idea de negocio');
      assert.equal(result.event.description.substring(0, 23),'Jornada organizada por:');
      assert.equal(result.event.datetime,'04/02/2016');
      assert.equal(result.event.hashtag,'@decharlas');
      assert.equal(result.event.url,'some url');
    }, done);
  });
});
