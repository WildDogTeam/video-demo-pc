const electron = require('electron')
const os = require('os')
import { autoUpdater } from "electron-updater"

// const autoUpdater = electron.autoUpdater
const dialog = electron.dialog
const appVersion = require('../../package.json').version

var data = ''

let updateFeed = ''
const platform = `${os.platform()}_${os.arch()}`

console.log(os.platform())

if (os.platform() === 'darwin') {
  // updateFeed = 'http://api.dode.top/updates/latest';
  updateFeed = 'http://localhost:3010/updates/latest';
} else if (os.platform() === 'win32') {
  updateFeed = 'http://localhost:3010/updates/releases/win/';
}

// function init(mainWindow) {
//   // if (!updateFeed || process.env.NODE_ENV === 'development') { return }

//   let feedURL = updateFeed + '?v=' + appVersion;
//   console.log(feedURL,1)
//   autoUpdater.setFeedURL(feedURL);
//   console.log(feedURL,2)

//   data = autoUpdater.getFeedURL()
//   console.log(data)
//   // // 更新可用, 可以通过通知系统告知用户有更新可用
//   autoUpdater.addListener("update-available", function(event) {
//     // 提示升级
//     dialog.showMessageBox({
//       type: "info",
//       buttons: ['ok'],
//       title: "检查升级",
//       message: "发现新版本可升级！"
//     }, function() {
//       console.log(1)
//       autoUpdater.quitAndInstall()
//       // readFileFromSystem(imageFilePath);
//     });
//   });
//   //更新下载完成后, 可提示用户重启应用程序
//   autoUpdater.addListener("update-downloaded", function(event, releaseNotes, releaseName, releaseDate, updateURL) {
//     // 提示升级
//     dialog.showMessageBox({
//       type: "info",
//       buttons: ['是', '否'],
//       title: "检查升级",
//       message: "下载完成是否重启应用！\n新版本号：" + releaseName + "\n更新日志：" + releaseNotes + "\n更新时间：" + releaseDate
//     }, function(response) {
//       if (response == 0) {
//         autoUpdater.quitAndInstall()
//       }
//     });
//   });
//   // 更新错误
//   autoUpdater.addListener("error", function(error) {
//     if (mainWindow) {
//       mainWindow.webContents.send('update-message', 'update-error');
//     }
//   });
//   // 正在检查更新
//   autoUpdater.addListener("checking-for-update", function(event) {
//     if (mainWindow) {
//       mainWindow.webContents.send('update-message', 'checking-for-update');
//     }
//   });
//   // 没有新版本
//   autoUpdater.addListener("update-not-available", function() {
//     if (mainWindow) {
//       mainWindow.webContents.send('update-message', 'update-not-available');
//     }
//   });

//   autoUpdater.checkForUpdates()
// }
//
//
function init(mainWindow) {

  if (!updateFeed || process.env.NODE_ENV === 'development') { return }

  let feedURL = updateFeed + '?v=' + appVersion;
  autoUpdater.setFeedURL(feedURL);
  // 更新下载进度事件
  // autoUpdater.on('download-progress', function(progressObj) {
  //   // mainWindow.webContents.send('downloadProgress', progressObj)
  //   dialog.showMessageBox({
  //       type: "info",
  //       buttons: ['ok'],
  //       title: "检查升级",
  //       message: "下载进度" + progressObj
  //     },
  //     function() {
  //       console.log(0)
  //       // autoUpdater.quitAndInstall()
  //     });

  // })

  autoUpdater.on('update-downloaded', function(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    dialog.showMessageBox({
      type: "info",
      buttons: ['是', '否'],
      title: "检查升级",
      message: "下载完成是否重启应用！\n新版本号"
    }, function(response) {
      if (response == 0) {
        autoUpdater.quitAndInstall()
      }
    });
  });

  //执行自动更新检查
  autoUpdater.checkForUpdates();
}

module.exports = {
  init
}
