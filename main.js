const { app } = require('electron');
const mainWindow = require('./mainWindow');

require('electron-reload')(__dirname);

app.on('ready', mainWindow.create);
app.on('window-all-closed', app.quit);
app.on('activate', () => mainWindow ? null : createWindow());
