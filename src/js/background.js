var showExtensionRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.meetup.com' },
      css: [".groupHome-nextMeetup"]
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.eventbrite.es' },
      css: ["#event-page"]
    }),
      new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'valenciarb.org' },
      css: [".eyelet"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};


chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([showExtensionRule]);
  });
});

