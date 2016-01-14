describe('EventFiller', function(){
  it('fills the form with the event details', function(done){
    withPopupFixture(function() {
      var an_event = {
        title:'a title',
        description:'a description',
        datetime: '2001-01-01T12:00:00Z',
        url: 'an url'
      }

      var filler = new EventFiller();
      filler.showDetails(an_event);

      assert.equal(document.querySelector('#title').value, 'a title');
      assert.equal(document.querySelector('#description').value, 'a description');
      assert.equal(document.querySelector('#link').value, 'an url');
    }, done);
  });

  it('displays a not found event message', function(done){
    withPopupFixture(function(){
      var filler = new EventFiller();
      filler.showNotFoundEventMessage();

      assert.equal(document.querySelector('.no-event').style.display, 'block');
    }, done);
  });
});


var withPopupFixture = function(next, done){
  var FILENAME = 'test/fixtures/popup.html';
  page.open(FILENAME, function() {
    page.injectJs('src/js/popup.js');
    page.evaluate(next);
    done();
  });  
}
