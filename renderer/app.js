let addModalOpenButton = document.querySelector('.open-add-modal');
let addModalCloseButton = document.querySelector('.close-add-modal');
let addModal = document.querySelector('#add-modal');
let addButton = document.querySelector('#add-button');
let itemInput = document.querySelector('#item-input');

addModalOpenButton.addEventListener('click', (e) => {
  e.preventDefault();
  addModal.classList.add('is-active');
});

addModalCloseButton.addEventListener('click', (e) => {
  e.preventDefault();
  addModal.classList.remove('is-active');
});

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  let newItemURL = itemInput.value;

  if (isValidURL(newItemURL)) {
    console.log(newItemURL)
  }
});

function isValidURL(str) {
  const VALID_URL_REGEX = /(https?:\/\/)?(www\.)?([a-zA-Z0-9-@]+\.)*\.[a-z]{2,3}/;
  
  const valid = VALID_URL_REGEX.exec(str);

  return valid ? true : false;
}
