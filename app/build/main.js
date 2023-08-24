"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
//import path from "path";
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL("http://localhost:5173/");
    //mainWindow.loadFile(path.join(__dirname, "../dist", "index.html"));
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
