var EventbriteScraper = function(options) {
  options = options || {};
  var url = options.url;

  function canBePublished() {
    var eventDetails = document.querySelectorAll('.listing-info__body .event-details .event-details__data');
    var address = eventDetails[1].innerText;
    return (address.indexOf('València') > -1 || address.indexOf('Valencia') > -1);
  }

  function getTitle(){
    return document.querySelector('.listing-hero-title').innerText;
  }

  function getDescription(){
    return document.querySelector('.listing-info__body .has-user-generated-content').innerText;
  }

  function getDateTime() {
    var time = document.querySelector('.listing-info__body .event-details .event-details__data meta');
    return time.getAttribute('content');
  }

  function getTwitter() {
    var pattern = 'http://twitter.com/';
    var links = document.querySelectorAll('ul.inline-link-list a');
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
        'hashtag': getTwitter(),
        'url': url
      }
      return response;
    }
  }
}
