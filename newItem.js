const { BrowserWindow } = require('electron');

let bgWindow;

 function newItem(url) {
  return new Promise((resolve, reject) => {
    console.log('in Promise');
    bgWindow = new BrowserWindow({
      width: 1000,
      height: 1000,
      show: false,
      webPreferences: {
        offscreen: true
      }
    });

  bgWindow.loadURL(url);
  bgWindow.webContents.on('did-finish-load', () => {
    
    bgWindow.webContents.capturePage((image) => {
      let screenshot = image.toDataURL();
      let title = bgWindow.getTitle();

      bgWindow.close();
      bgWindow = null;
      resolve({ title, screenshot })
    });
  });

  bgWindow.webContents.on('did-fail-load', () => {
    reject({});
  });

  });
}

module.exports = newItem;
