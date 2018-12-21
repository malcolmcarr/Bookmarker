const { remote, shell } = require('electron');

const template = [
  {
    label: 'Items',
    submenu: [
      {
        label: 'New Bookmark',
        accelerator: 'CmdOrCtrl+N',
        click() {
          document.querySelector('.open-add-modal').click();
        }
      },
      {
        label: 'Read Bookmark',
        accelerator: 'CmdOrCtrl+Enter',
        click() {
          window.openItem();
        }
      },
      {
        label: 'Delete Bookmark',
        accelerator: 'CmdOrCtrl+Backspace',
        click() {
          document.querySelector('.is-active #delete').click();
        }
      },
      { type: 'separator' },
      {
        label: 'Search',
        accelerator: 'CmdOrCtrl+Shift+F',
        click() {
          document.querySelector('#search').focus();
        }
      },
      { type: 'separator' },
      {
        label: 'Open in Browser',
        accelerator: 'CmdOrCtrl+O',
        click() {
          window.openItemInBrowser();
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          shell.openExternal('https://google.com')
        }
      }
    ]
  }
];

// Mac
if (process.platform === 'darwin') {
  template.unshift({
    label: remote.app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  });

  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ];
}

// Give the app an menu
const menu = remote.Menu.buildFromTemplate(template);
remote.Menu.setApplicationMenu(menu);