var createScraper = function(url) {
  var Scraper;
  if(url.indexOf('http://www.meetup.com/') >= 0) {
    Scraper = MeetupScraper;
  } else {
    Scraper = EventbriteScraper;
  }
  return new Scraper({url: url});
}


chrome.runtime.onMessage.addListener(
  function(request, sender, next) {
    if (request.fetch == true) {
      var scraper = createScraper(request.url);
      next(scraper.scrap());
    }
  }
);
