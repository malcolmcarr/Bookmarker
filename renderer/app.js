const { ipcRenderer } = require('electron');
const validator = require('validator');

const items = require('./items');
const menu = require('./menu');

let addModalOpenButton = document.querySelector('.open-add-modal');
let addModalCloseButton = document.querySelector('.close-add-modal');
let addModal = document.querySelector('#add-modal');
let addButton = document.querySelector('#add-button');
let itemInput = document.querySelector('#item-input');
let message = document.querySelector('#message');
let searchBar = document.querySelector('#search');

document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowUp':
      items.changeItem('up');
      break;
    case 'ArrowDown':
      items.changeItem('down');
      break;
    default:
      break;
  }
});

addModalOpenButton.addEventListener('click', (e) => {
  e.preventDefault();
  addModal.classList.add('is-active');
});

addModalCloseButton.addEventListener('click', (e) => {
  e.preventDefault();
  addModal.classList.remove('is-active');
});

addButton.addEventListener('click', submitItem);

searchBar.addEventListener('keyup', () => {
  const query = searchBar.value.toLowerCase();
  let titles = document.querySelectorAll('.read-item > h2');

  for (let title of titles) {
    title.innerText.toLowerCase().includes(query) ? title.parentElement.style.display = '' : 
    title.parentElement.style.display = 'none';
  }
});

document.addEventListener('keypress', (e) => {
  if (e.code === 'Enter' && addModal.classList.contains('is-active')) {
    submitItem();
  } else if (e.code === 'Enter') {
    console.log('ran keypress event');
    window.openItem();
  }
});

ipcRenderer.on('newItemSuccess', (e, item) => {
  itemInput.disabled = false;
  addModalCloseButton.disabled = false;
  itemInput.value = '';
  addButton.classList.remove('is-loading');
  addModal.classList.remove('is-active');
  
  items.pushItem(item);
  items.addItemToList(item);

  if (items.getItems().length === 1) {
    document.querySelector('.read-item').classList.add('is-active');
  }
});

if (items.getItems()) {
  for (let item of items.getItems()) {
    items.addItemToList(item);
  }
  document.querySelector('.read-item').classList.add('is-active');
}

function submitItem() {
    let newItemURL = itemInput.value;
  
    if (validator.isURL(newItemURL)) {

      // Add protocol if input does not contain
      if (!newItemURL.startsWith('http')) {
        newItemURL = `http://${newItemURL}`;
      }

      itemInput.disabled = true;
      addModalCloseButton.disabled = true;
      addButton.classList.add('is-loading');
      message.classList.remove('error');
      message.innerHTML = '';

      ipcRenderer.send('newItem', newItemURL);
    } else {
      message.classList.add('error');
      message.innerHTML = "Please enter a valid URL.";
    }
}
