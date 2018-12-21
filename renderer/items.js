const toReadItems = JSON.parse(localStorage.getItem('items')) || [];

const saveItems = () => {
  localStorage.setItem('items', JSON.stringify(toReadItems));
};

const pushItem = (item) => {
  toReadItems.push(item);
  saveItems();
};

const addItemToList = (item) => {
  const { screenshot, title } = item;
  document.querySelector('#no-items').style.display = 'none';
  constructReadItem(screenshot, title);
};

const getItems = () => {
  return toReadItems.length ? toReadItems : null;
};

const selectItem = (e) => {
  let readItems = document.querySelectorAll('.read-item');
  for (item of readItems) {
    item.classList.remove('is-active');
  }
  e.currentTarget.classList.add('is-active');
};

const changeItem = (direction) => {
  let active = document.querySelector('.read-item.is-active');
  let selection = (direction == 'down') ? active.nextElementSibling : active.previousElementSibling;

  if (selection && selection.classList.contains('read-item')) {
    active.classList.remove('is-active');
    selection.classList.add('is-active');
  }
};

const constructReadItem = (screenshot, title) => {
  let readList = document.querySelector('#read-list');
  let anchor = document.createElement('a');
  anchor.classList.add('panel-block', 'read-item');
  let figure = document.createElement('figure');
  figure.classList.add('image', 'has-shadow', 'is-64x64', 'thumb');
  let image = document.createElement('img');
  image.src = screenshot;
  let h2 = document.createElement('h2');
  h2.classList.add('title', 'is-4', 'column');
  h2.innerText = title;
  
  anchor.appendChild(figure);
  anchor.appendChild(h2);
  figure.appendChild(image);
  readList.appendChild(anchor);
  
  let readItems = document.querySelectorAll('.read-item');

  for (item of readItems) {
    console.log(item);
    item.addEventListener('click', selectItem);
  }
  
};

module.exports = {
  addItemToList,
  pushItem,
  getItems,
  changeItem
};