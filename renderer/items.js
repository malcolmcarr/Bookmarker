let toReadItems = JSON.parse(localStorage.getItem('items')) || [];

const saveItems = () => {
  localStorage.setItem('items', JSON.stringify(toReadItems));
};

const pushItem = (item) => {
  toReadItems.push(item);
  saveItems();
};

const addItemToList = (item) => {
  const { screenshot, title, url } = item;
  document.querySelector('#no-items').style.display = 'none';
  constructReadItem(screenshot, title, url);
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

// Returns the index of a node in the children list
const _getIndex = (node) => {
  return [...node.parentNode.children].indexOf(node) - 1;
}

const _remove = (element) => {
  element.parentNode.removeChild(element);
}

const deleteItem = (item) => {
  // Use parent to delete entire item, not the button
  const index =_getIndex(item.parentNode);
  const delNode = document.querySelectorAll('.read-item')[index];
  const wasActive = delNode.classList.contains('is-active');

  // Removes the node from view
  _remove(delNode);

  // Update array to remove item and then save the new array
  toReadItems = toReadItems.filter((_, i) => {
    return i !== index;
  });
  saveItems();

  // Make a new active item if necessary or display no items message
  if (toReadItems.length && wasActive) {
    console.log('ran if')
    let newActiveIndex = (index === 0) ? 0 : index - 1;
    let activeNode = document.querySelectorAll('.read-item')[newActiveIndex];
    activeNode.classList.add('is-active');
  } else if (!toReadItems.length) {
    document.querySelector('#no-items').style.display = '';
  }
}

const openItem = () => {
  if (!getItems().length) return;

  let target = document.querySelector('.read-item.is-active');
  let itemURL = encodeURIComponent(target.getAttribute('data-url'));
  let itemTitle = target.getAttribute('data-title');

  let readerWindowURL = `file://${__dirname}/reader.html?url=${itemURL}`;

  let readerWindow = window.open(readerWindowURL, itemTitle);
}

const constructReadItem = (screenshot, title, url) => {
  let readList = document.querySelector('#read-list');
  let anchor = document.createElement('a');
  anchor.classList.add('panel-block', 'read-item', 'has-icon-right');
  anchor.setAttribute('data-url', url);
  anchor.setAttribute('data-title', title);
  let deleteButton = document.createElement('a');
  deleteButton.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    deleteItem(e.currentTarget);
  })
  deleteButton.id = 'delete';
  deleteButton.title = 'Remove bookmark';
  let icon = document.createElement('i');
  icon.classList.add('fa','fa-trash', 'fa-2x');
  let figure = document.createElement('figure');
  figure.classList.add('image', 'has-shadow', 'is-64x64', 'thumb');
  let image = document.createElement('img');
  image.src = screenshot;
  let h2 = document.createElement('h2');
  h2.classList.add('title', 'is-4', 'column');
  h2.innerText = title;
  
  deleteButton.appendChild(icon);
  anchor.appendChild(figure);
  anchor.appendChild(h2);
  anchor.appendChild(deleteButton);
  figure.appendChild(image);
  readList.appendChild(anchor);
  
  let readItems = document.querySelectorAll('.read-item');

  for (item of readItems) {
    item.addEventListener('click', selectItem);
    item.addEventListener('dblclick', openItem);
  }
  
};

module.exports = {
  addItemToList,
  deleteItem,
  openItem,
  pushItem,
  getItems,
  changeItem
};