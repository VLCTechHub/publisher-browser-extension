var EventbriteScraper = function(options) {
  options = options || {};
  var url = options.url;

  function canBePublished() {
    var locality = document.querySelector('#panel_when meta[itemprop="addressLocality"]').getAttribute('content');
    var region = document.querySelector('#panel_when meta[itemprop="addressRegion"]').getAttribute('content');
    return (locality == 'València' || locality == 'Valencia' || region == 'Valencia');
  }

  function getTitle(){
    return document.querySelector('#event_header .summary').innerText;
  }

  function getDescription(){
    return document.querySelector('.description').innerText;
  }

  function getDateTime() {
    var time = document.querySelector('.dtstart .value-title');
    return time.getAttribute('title');
  }

  function getHashTag(){
    var twitter_link = document.querySelector('#organizer_twitter a');
    if(twitter_link == null) return null; 
    return '@' + twitter_link.innerText;
  }

  return {
    scrap: function() {
      var response = { 'success': canBePublished() }
      if (!response['success'] ) { return response; }

      response['event'] = {
        'title': getTitle(),
        'description': getDescription(),
        'datetime': getDateTime(),
        'hashtag': getHashTag(),
        'url': url
      }
      return response;
    }
  }
}
