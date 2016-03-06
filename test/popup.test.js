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
      assert.equal(document.querySelector('#datetime').value, '2001-01-01T12:00');
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

describe('EventPublisher', function(){
  it('sends the event to vlctechhub api', function(done){
    withPopupFixture(function(){
     //show event in dom
      document.querySelector('#title').value = 'a title';
      document.querySelector('#description').value = 'a description';
      document.querySelector('#link').value = 'an url';
      document.querySelector('#hashtag').value = 'a hashtag';
      document.querySelector('#datetime').value = '2001-01-01T12:00';

      //mock momentjs
      moment = {
        tz: function(value){
          return {
            toISOString: function(){
              return value;
            }
          }
        }
      }

      //mock fetch and its promises
      window.fetch = function(){
        return {
          then: function(next) {
            next({ ok: true});
            return { catch: function(next) {next()}} },
        }
      }
      window.Headers = function() {}

      //spy on fetch
      var spy = sinon.spy(window, 'fetch');

      var publisher = new EventPublisher();
      publisher.publish({ preventDefault: function(){}});

      assert(spy.calledOnce);
      var url = spy.firstCall.args[0];
      var data = spy.firstCall.args[1];
      var body = JSON.parse(data.body);
      var event = body.event;
      assert.equal(url, 'https://vlctechhub-api.herokuapp.com/v1/events');
      assert.equal(event.title, 'a title');
      assert.equal(event.description, 'a description');
      assert.equal(event.link, 'an url');
      assert.equal(event.date, '2001-01-01T12:00');
      assert.equal(event.hashtag, 'a hashtag');
    }, done);
  });
})


var withPopupFixture = function(next, done){
  var FILENAME = 'test/fixtures/popup.html';
  page.open(FILENAME, function() {
    page.injectJs('js/vendor/moment.min.js');
    page.injectJs('js/vendor/moment-timezone-with-data.min.js');
    page.injectJs('src/js/popup.js');
    page.evaluate(next);
    done();
  });
}
