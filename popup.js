document.addEventListener("DOMContentLoaded", function(event) {
  fetchEventDetails().then(showDetails, showWarning);
});

function fetchEventDetails(){
  var promise = new Promise(function(resolve, reject){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {fetch:true}, function(response) {
        if(response.isFromValencia == true){
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  });

  return promise; 
}

function showDetails(eventDetails) {
  hideWarning();
  fillForm(eventDetails);
}

function fillForm(eventDetails) {
  document.querySelector('#title').value = eventDetails.title;
  document.querySelector('#description').value = eventDetails.description;
  document.querySelector('#datetime').value = eventDetails.datetime.substring(0,16);
 
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    document.querySelector('#link').value = tabs[0].url
  });
}

function hideWarning() {
  document.querySelector('form').style.display = 'inline';
  document.querySelector('.content').style.display = 'none';
}

function showWarning() {
  document.querySelector('form').style.display = 'none';
  document.querySelector('.content').style.display = 'inline';
}