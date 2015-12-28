function canBePublished() {
  var isEventDetailPage = document.querySelector('#eventdets') !== null;
  return isEventDetailPage && isFromValencia() && isOpen();
}

function isFromValencia(){
  return document.querySelector('span.locality').innerText === 'Valencia';
}

function isOpen(){
  return document.querySelector('#eventdets #event-when-display time') !== null;
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

function getResponse() {
  var response = { 'success': canBePublished() }
  if (!response['success'] ) { return response; }

  response['event'] = {
    'title': getTitle(),
    'description': getDescription(),
    'datetime': getDateTime()
  }
  return response;
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.fetch == true) {
      sendResponse(getResponse());
    }
  }
);
