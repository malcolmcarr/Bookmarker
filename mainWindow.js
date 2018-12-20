const { BrowserWindow } = require('electron');

let window;

const createWindow = () => {
  window = new BrowserWindow({ 
    width: 500, 
    height: 650, 
    minWidth: 350, 
    minHeight: 310,
    maxWidth: 650,
  });
  
  window.loadFile('./renderer/main.html');
  window.webContents.openDevTools();

  window.on('closed', () => {
    window = null;
  });

  return window;
}

module.exports = {
  create: createWindow
};