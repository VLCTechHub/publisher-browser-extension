window.onload = function() {
  fetchEventDetails().then(showDetails, showNotFoundEventMessage);
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form').addEventListener('submit', publish);
});

function fetchEventDetails(){
  var promise = new Promise(function(resolve, reject){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {fetch:true}, function(response) {
        if(response.success == true){
          resolve(response.event);
        } else {
          reject(response.event);
        }
      });
    });
  });

  return promise; 
}

function publish(event) {
  event.preventDefault();

  var button = document.querySelector('form button');
  button.innerText = 'Publicando...';
  button.disabled = true;
  
  var eventDetail = {
    title: document.querySelector('#title').value,
    description: document.querySelector('#description').value,
    link: document.querySelector('#link').value,
    date: moment.tz(document.querySelector('#datetime').value,"Europe/Madrid").toISOString(),
    hashtag: document.querySelector('#hashtag').value
  }

  // https://davidwalsh.name/fetch
  fetch('http://vlctechhub-api.herokuapp.com/v0/events/new', {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(eventDetail)
  }).then(showWasPublishedMessage).catch(showNotPublishedMessage);
}

function showDetails(eventDetails) {
  showForm();
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

function hideAll() {
  document.querySelector('form').style.display = 'none';
  document.querySelector('.content').style.display = 'none';
  document.querySelector('.no-event').style.display = 'none';
  document.querySelector('.published').style.display = 'none';
  document.querySelector('.not-published').style.display = 'none';
}

function showForm() {
  hideAll();
  document.querySelector('form').style.display = 'block';
}

function showNotFoundEventMessage() {
  hideAll();
  document.querySelector('.content').style.display = 'block';
  document.querySelector('.no-event').style.display = 'block';
}

function showPublishedMessage(){
  hideAll();
  document.querySelector('.content').style.display = 'block';
  document.querySelector('.published').style.display = 'block';
}

function showNotPublishedMessage(){
  hideAll();
  document.querySelector('.content').style.display = 'block';
  document.querySelector('.not-published').style.display = 'block';
}

function showWasPublishedMessage(response) {
  if(response.ok) {
    showPublishedMessage();
  } else {
    showNotPublishedMessage();
  }
}