require('dotenv').config();
const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');
const logic = require('./logic');


let win;
let tray;

const createWindow = (width, height) => {
    // Create the browser window.
    win = new BrowserWindow({
        width,
        height,
        frame: false,
        icon:'./styles/tray.ico'
    });

    logic.attachActionsToWindow(win);

    // and load the index.html of the app.
    win.loadFile('index.html');

    win.on('minimize',function(event){
        event.preventDefault();
        win.hide();
    });

    win.on('close', function (event) {
        if(!app.isQuiting){
            event.preventDefault();
            win.hide();
        }

        return false;
    });
}


app.on('ready', () => {
    tray = new Tray('./styles/tray.ico');
    const contextMenu = Menu.buildFromTemplate([
      {label: 'Open', click() { createWindow(800,600); }},
      {label: 'Run on Startup', type: 'checkbox', checked: true},
      {label: 'Quit', click() { app.isQuiting = true; app.quit(); }},
    ]);
    tray.setToolTip('Peerfarm');
    tray.setContextMenu(contextMenu);
    tray.on('double-click', () => {
        console.log('double-click');
    });
})
