const { ipcRenderer } = require('electron');
const validator = require('validator');


let addModalOpenButton = document.querySelector('.open-add-modal');
let addModalCloseButton = document.querySelector('.close-add-modal');
let addModal = document.querySelector('#add-modal');
let addButton = document.querySelector('#add-button');
let itemInput = document.querySelector('#item-input');
let error = document.querySelector('#error');

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

function submitItem() {
    let newItemURL = itemInput.value;
  
    if (validator.isURL(newItemURL)) {
      error.innerHTML = "";
      ipcRenderer.send('newItem', newItemURL);
    } else {
      error.innerHTML = "Please enter a valid URL.";
    }
}
