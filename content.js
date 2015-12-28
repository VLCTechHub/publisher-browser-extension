function isFromValencia() {
  var locality = document.querySelector('span.locality');
  var isEventDetailPage = document.querySelector('#eventdets') !== null;
  return isEventDetailPage && locality.innerText === 'Valencia'
}

function getTitle(){
  return document.querySelector('#eventdets #event-title h1').innerText;
}

function getDescription(){
  return document.querySelector('#eventdets #event-description-wrap').innerText;
}

function getDateTime() {
  return document.querySelector('#eventdets #event-when-display time').getAttribute('datetime');
}

function getEventDetails() {
  var details = { 'isFromValencia': isFromValencia() }
  if (!details['isFromValencia'] ) { return details; }

  details['title'] = getTitle();
  details['description'] = getDescription();
  details['datetime'] = getDateTime();
  return details;
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.fetch == true) {
      sendResponse(getEventDetails());
    }
  }
);
