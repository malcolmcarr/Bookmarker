const { ipcRenderer } = require('electron');
const validator = require('validator');


let addModalOpenButton = document.querySelector('.open-add-modal');
let addModalCloseButton = document.querySelector('.close-add-modal');
let addModal = document.querySelector('#add-modal');
let addButton = document.querySelector('#add-button');
let itemInput = document.querySelector('#item-input');
let message = document.querySelector('#message');

addModalOpenButton.addEventListener('click', (e) => {
  e.preventDefault();
  addModal.classList.add('is-active');
});

addModalCloseButton.addEventListener('click', (e) => {
  e.preventDefault();
  addModal.classList.remove('is-active');
});

addButton.addEventListener('click', submitItem);

document.addEventListener('keypress', (e) => {
  if (e.code === 'Enter' && addModal.classList.contains('is-active')) {
    submitItem();
  }
});

ipcRenderer.on('newItemSuccess', (e, item) => {
  itemInput.disabled = false;
  addModalCloseButton.disabled = false;
  itemInput.value = '';
  message.classList.add('success');
  message.innerHTML = 'Success';
  addButton.classList.remove('is-loading');
  addModal.classList.remove('is-active');
});

function submitItem() {
    let newItemURL = itemInput.value;
  
    if (validator.isURL(newItemURL)) {

      // Add protocol if input does not contain
      if (!newItemURL.startsWith('http')) {
        newItemURL = `http://${newItemURL}`;
        console.log(newItemURL);
      }

      itemInput.disabled = true;
      addModalCloseButton.disabled = true;
      addButton.classList.add('is-loading');
      message.classList.remove('error');
      message.innerHTML = '';

      ipcRenderer.send('newItem', newItemURL);
    } else {
      message.classList.remove('success');
      message.classList.remove('error');
      message.innerHTML = "Please enter a valid URL.";
    }
}
