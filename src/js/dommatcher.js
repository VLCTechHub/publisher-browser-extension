
var notifyEnableAddon = function(){
  var meetupPage = '.groupHome-nextMeetup';
  var eventbritePage = '#event-page';
  var valenciarbPage = '.eyelet';
  var els = Array.from(document.querySelectorAll(meetupPage)) +
    Array.from(document.querySelectorAll(eventbritePage)) +
    Array.from(document.querySelectorAll(valenciarbPage));

  if(els.length > 0) {
    chrome.runtime.sendMessage({enableAddon: true});
  }
  else {
    chrome.runtime.sendMessage({enableAddon: false});
  }
};


new MutationObserver(notifyEnableAddon)
  .observe(document.documentElement, {
    childList: true,
    subtree: true
  });
