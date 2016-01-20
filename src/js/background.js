var showExtensionRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.meetup.com' },
      css: ["#eventdets"]
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.eventbrite.es' },
      css: ["#page_eventview"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};


chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([showExtensionRule]);
  });
});

