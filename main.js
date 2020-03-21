const { app, Menu, BrowserWindow, Tray, nativeTheme, nativeImage } = require('electron')


function createWindow(win){
  nativeTheme.themeSource = "dark"
  win = new BrowserWindow({
    width: 800,
    height: 160,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
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

app.on('ready', () => {
  const trayIcon = nativeImage.createFromPath('resources/monitor_outline.png');
  tray = new Tray(trayIcon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', type: 'normal', role:"quit"},
  ])
  tray.setToolTip('WinDDC')
  tray.setContextMenu(contextMenu)
  
  
  tray.addListener("click", createWindow )
})
