var ValenciaRbScraper = function(options) {
  options = options || {};
  var url = options.url;

  function canBePublished() {
    return hasADate();
  }

  function hasADate(){
   return getDateTime() != null;
  }

  function getTitle(){
    return document.querySelector('#main .content h2').innerText;
  }

  function getDescription(){
    var nl = document.querySelectorAll('#main .content p');
    var texts = [];
    for(var i=0; i < nl.length; i++) {
      texts.push(nl[i].innerText);
    }
    return texts.join('');
  }

  function getDateTime() {
    var time = document.querySelector('#main h2.scream time');
    if(!time) { return null; }
    return time.getAttribute('datetime');
  }

  return {
    scrap: function() {
      var response = { 'success': canBePublished() }
      if (!response['success'] ) { return response; }

      response['event'] = {
        'title': getTitle(),
        'description': getDescription(),
        'datetime': getDateTime(),
        'hashtag': '@valenciarb',
        'url': url
      }
      return response;
    }
  }
}
