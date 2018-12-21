const saveItems = () => {
  localStorage.setItem('items', JSON.stringify(toReadItems))
}

const pushItem = (item) => {
  toReadItems.push(item);
  saveItems();
}

const addItemToList = (item) => {
  const { screenshot, title } = item;
  document.querySelector('#no-items').style.display = 'none';

  let itemHTML = `
            <a class="panel-block read-item">
              <figure class="image has-shadow is-64x64 thumb">
                <img src="${item.screenshot}>
              </figure>
              <h2 class="title is-4 column">${item.title}</h2>
            </a>`;
  constructReadItem(screenshot, title);
}

const getItems = () => {
  return toReadItems.length ? toReadItems: null;
}

const toReadItems = JSON.parse(localStorage.getItem('items')) || [];



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

}

module.exports = {
  addItemToList,
  pushItem,
  getItems
};