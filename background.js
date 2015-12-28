chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   if(request.isFromValencia == true) {
      localStorage.eventDetails = JSON.stringify(request);
    } else {
      localStorage.eventDetails = null;
    }
  });

var ruleMeetup = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.meetup.com' },
      css: ["#eventdets"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([ruleMeetup]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) { 
  chrome.tabs.executeScript(null, {file: "content.js"}, function(results) {   alert('ll') });
});



