var createScraper = function(url) {
  var Scraper;

  if(url.indexOf('https://www.meetup.com/') >= 0) {
    Scraper = MeetupScraper;
  } else if (url.indexOf('http://valenciarb.org') >= 0) {
    Scraper = ValenciaRbScraper;
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
