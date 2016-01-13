var MeetupScrapper = function() {
  function canBePublished() {
    var isEventDetailPage = document.querySelector('#eventdets') !== null;
    return isEventDetailPage && isFromValencia() && hasADate();
  }

  function isFromValencia(){
    return document.querySelector('span.locality').innerText === 'Valencia';
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

  return {
    scrap: function() {
      var response = { 'success': canBePublished() }
      if (!response['success'] ) { return response; }

      response['event'] = {
        'title': getTitle(),
        'description': getDescription(),
        'datetime': getDateTime()
      }
      return response;      
    }
  }
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.fetch == true) {
      var scrapper = new MeetupScrapper();
      sendResponse(scrapper.scrap());
    }
  }
);
