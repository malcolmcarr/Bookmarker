const { app, ipcMain } = require('electron');
const mainWindow = require('./mainWindow');

require('electron-reload')(__dirname);

app.on('ready', mainWindow.create);
app.on('window-all-closed', app.quit);
app.on('activate', () => mainWindow ? null : createWindow());

ipcMain.on('newItem', (e, itemURL) => {
  console.log('Received new item!', itemURL);
});
