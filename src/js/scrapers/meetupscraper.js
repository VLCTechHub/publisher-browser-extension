var MeetupScraper = function(options) {
  options = options || {};
  var url = options.url;

  function canBePublished() {
    var isGroupDetailPage = document.querySelector('.groupPageWrapper') !== null;
    return isGroupDetailPage && hasADate();
  }

  function hasADate(){
   return getDateTime() != null;
  }

  function getTitle(){
    return document.querySelector('.groupHome-eventsList-upcomingEvents .eventCardHead--title').innerText;
  }

  function getDescription(){
    let els = document.querySelectorAll('.groupHome-eventsList-upcomingEvents .eventCard div > div > div > p');
    let description = '';
    els.forEach(el => {
      let text = el.innerText.trim();
      if(text) { description = description + text; }
    });
    return description;
  }

  function getDateTime() {
    var time = document.querySelector('.groupHome-eventsList-upcomingEvents .eventTimeDisplay time');
    if(!time || !time.getAttribute('datetime')) { return null; }

    var date = new Date(parseInt(time.getAttribute('datetime')));
    var parsedDay = date.toISOString().substring(0,11);
    var options = {
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      timeZone: 'Europe/Madrid'
    }

    var parsedTime = ("0" + date.toLocaleString('es-ES', options)).slice(-8);//0 does not affects 10,11,12 since we always slice 8
    return parsedDay + parsedTime;
  }

  function getTwitter() {
    var pattern = 'http://www.twitter.com/';
    var links = document.querySelectorAll('.group-description-socialLink a');
    for(var i=0; i < links.length; i++) {
      if(links[i].href.indexOf(pattern) >= 0) {
        return '@' +
          links[i].href.substring(pattern.length, links[i].href.length);
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
