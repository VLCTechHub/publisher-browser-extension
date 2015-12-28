document.addEventListener("DOMContentLoaded", function(event) {
  var eventDetails = JSON.parse(localStorage.eventDetails);
  if(!eventDetails) { return; }
  prefillForm(eventDetails);
});

function prefillForm(eventDetails) {
  document.querySelector('#title').value = eventDetails.title;
  document.querySelector('#description').value = eventDetails.description;
 
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    document.querySelector('#link').value = tabs[0].url
  });

  document.querySelector('#datetime').value = eventDetails.datetime.substring(0,16);
}