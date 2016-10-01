var DecharlasScraper = function(options) {
  options = options || {};
  var url = options.url;

  function canBePublished() {
    return true;
  }

  function getTitle(){
    return document.querySelector('h1.page-title').innerText.trim();
  }

  function getDescription(){
    return document.querySelector('div.page_body').innerText;
  }

  function getDateTime() {
    return document.querySelector('.meta').innerText;
  }

  function getHashTag(){
    return '@decharlas';
  }

  return {
    scrap: function() {
      var response = { 'success': canBePublished() }
      if (!response['success'] ) { return response; }

      response['event'] = {
        'title': getTitle(),
        'description': getDescription(),
        'datetime': getDateTime(),
        'hashtag': getHashTag(),
        'url': url
      }
      return response;
    }
  }
}
