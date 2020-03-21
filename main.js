const { app, Menu, BrowserWindow, Tray, nativeTheme, nativeImage } = require('electron')
var path = require('path');

function createWindow(win){
  nativeTheme.themeSource = "dark"
  var appIconPath = path.join(__dirname, 'resources', 'black_monitor_outline.png');

  win = new BrowserWindow({
    width: 600,
    height: 160,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    
    icon: path.join(__dirname, "resources", "black_monitor_outline.png")
  })
  win.removeMenu()
  // and load the index.html of the app.
  win.loadFile('index.html')
  win.once('ready-to-show', () => {
    win.show()
  })
}

let tray = null
let win = null

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  console.log("All windows are closed.")
});

if (nativeTheme.shouldUseDarkColors){
  var icon_name = "monitor_outline.png"
} else {
  var icon_name = "black_monitor_outline.png"
}
var iconPath = path.join(__dirname, 'resources', icon_name);

app.on('ready', () => {
  
  const trayIcon = nativeImage.createFromPath(iconPath);
  tray = new Tray(trayIcon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', type: 'normal', role:"quit"},
  ])
  tray.setToolTip('WinDDC')
  tray.setContextMenu(contextMenu)
  
  
  tray.addListener("click", createWindow )
})
