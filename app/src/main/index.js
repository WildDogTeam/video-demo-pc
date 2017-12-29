'use strict'

const electron = require('electron');
const { app, BrowserWindow, dialog, Menu } = electron;
let mainWindow = null

const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:${require('../../../config').port}` :
  `file://${__dirname}/index.html`

function createWindow() {
  /*Initial window options*/
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    title: '野狗视频通话',
    // minimizable:false, //最大化
    // maximizable:false,//最小化
    // resizable: false,
    // transparent: true,

  })

  mainWindow.loadURL(winURL)
  // mainWindow.maximize()//最大化
  // mainWindow.setResizable(false)//用户不能改变窗口大小

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // console.log('mainWindow opened')
}


app.on("ready", function() {
  createWindow()
  var template = [{
    label: 'File',
    submenu: [{
        label: '检查更新',
        accelerator: 'Control+O',
        click: function() {
          dialog.showMessageBox({
            type: "info",
            buttons: ['是', '否'],
            title: "检查升级",
            message: "是否检查更新\n如果有更新将自动下载！"
          }, function(response) {
            if (response == 0) {
              console.log(response)
              // autoUpdater.init(mainWindow)
            }
          });
        }
      },
      {
        label: '退出',
        accelerator: 'Control+Q',
        click: function() { app.quit(); }
      },
    ]
  }];

  // let menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);

  mainWindow.webContents.on('did-finish-load', () => {
    // console.log('did-finish-load')
    // autoUpdater.init(mainWindow)
    // console.log(mainWindow.getPosition())
  })
});

/*close window*/
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/*
Cmd + Q
 */
app.on('will-quit', () => {
  // console.log('wilddog')
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
