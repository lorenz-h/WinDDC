const { app, Menu, BrowserWindow, nativeTheme, nativeImage } = require('electron')
const path = require('path');

let win = null;

app.on('ready', () => {
    createWindow(win)
})


function createWindow(win){
    nativeTheme.themeSource = "dark"
    const appIconPath = path.join(__dirname, 'resources', 'black_monitor_outline.png');

    win = new BrowserWindow({
        width: 700,
        height: 270,
        webPreferences: {
            nodeIntegration: true
        },

        icon: path.join(__dirname, "resources", "black_monitor_outline.png")
    })

    // win.removeMenu()
    win.loadFile('render/render.html')
    win.once('ready-to-show', () => {
        win.show()
    })
}