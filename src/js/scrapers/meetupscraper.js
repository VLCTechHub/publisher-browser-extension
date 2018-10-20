var MeetupScraper = function(options) {
  options = options || {};
  var url = options.url;

  function canBePublished() {
    var isGroupDetailPage = document.querySelector('.groupPageWrapper') !== null;
    return isGroupDetailPage && isFromValencia() && hasADate();
  }

  function isFromValencia(){
    var groupCity = document.querySelector('.groupHomeHeader-groupInfo .chunk');
    var eventCity = document.querySelector('.venueDisplay-venue-address');
    var isGroupInValencia = !!groupCity && groupCity.innerText.indexOf('Valencia') > -1;
    var isEventInValencia = !!eventCity && eventCity.innerText.indexOf('Valencia') > -1;
    return isGroupInValencia || isEventInValencia;
  }

  function hasADate(){
   return getDateTime() != null;
  }

  function getTitle(){
    return document.querySelector('.groupHome-nextMeetup .eventCardHead--title').innerText;
  }

  function getDescription(){
    return document.querySelector('.groupHome-nextMeetup .eventCard--MainContent--description').innerHTML;
  }

  function getDateTime() {
    var time = document.querySelector('.groupHome-nextMeetup .eventTimeDisplay time');
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
