var MeetupScraper = function(options) {
  options = options || {};
  var url = options.url;

  function canBePublished() {
    var isEventDetailPage = document.querySelector('#eventdets') !== null;
    return isEventDetailPage && isFromValencia() && hasADate();
  }

  function isFromValencia(){
    var isGroupInValencia = document.querySelector('span.locality').innerText === 'Valencia';
    var isEventInValencia = document.querySelector('.event-where-address span:first-of-type').innerText === 'Valencia';
    return isGroupInValencia || isEventInValencia;
  }

  function hasADate(){
   return getDateTime() != null;
  }

  function getTitle(){
    return document.querySelector('#eventdets #event-title h1').innerText;
  }

  function getDescription(){
    return document.querySelector('#eventdets #event-description-wrap').innerText;
  }

  function getDateTime() {
    var time = document.querySelector('#eventdets #event-when-display time');
    if(!time) { return null; }
    return time.getAttribute('datetime');
  }

  function getTwitter() {
    var pattern = 'http://twitter.com/';
    var links = document.querySelectorAll('a.metabox-social-icon');
    for(var i=0; i < links.length; i++) {
      if(links[i].href.indexOf(pattern) >= 0) {
        return '@' +
                links[i].href.substring(pattern.length, links[i].href.length - 1);
      }
    }
    return '';
  }

  return {
    scrap: function() {
      var response = { 'success': canBePublished() }
      if (!response['success'] ) { return response; }

      response['event'] = {
        'title': getTitle(),
        'description': getDescription(),
        'datetime': getDateTime(),
        'url': url,
        'hashtag': getTwitter()
      }
      return response;
    }
  }
}
