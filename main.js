const { app, ipcMain } = require('electron');
const mainWindow = require('./mainWindow');
const newItem = require('./newItem');


require('electron-reload')(__dirname);

app.on('ready', mainWindow.create);
app.on('window-all-closed', app.quit);
app.on('activate', () => mainWindow ? null : createWindow());

ipcMain.on('newItem', async (e, itemURL) => {
  let item = await newItem(itemURL);
  console.log('resolved');
  console.log(item);
});
