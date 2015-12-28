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
  return {
    'isFromValencia': true,
    'title': getTitle(),
    'description': getDescription(),
    'datetime': getDateTime()
  }
}


if(!isFromValencia()){
  chrome.runtime.sendMessage({isFromValencia: false});
} else {
  chrome.runtime.sendMessage(getEventDetails());
}