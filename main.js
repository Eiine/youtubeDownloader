const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const { exec } = require('child_process');
const path = require("path")
const convert= require("./src/utils/download")
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "/src","preloads", 'preload.js')
      }
    })
  
    win.loadFile(path.join(__dirname, "/src","/views", "index.html"))
  }

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  //abre el cuadro de dialogo para seleccionar una carpeta
  
  ipcMain.on("openDounloadDirectori",(event)=>{
    let data=dialog.showOpenDialogSync({properties:["openDirectory"]})
    //envia la ruta para ser mostrada en pantalla
    event.sender.send("returnDirectori",data[0])
  })

  ipcMain.on("start-donwload",(event,data)=>{
    
    convert(data.link.replace(/&.*$/, ''), data.folder, event)
  })
 
  ipcMain.on("openFolder",(event,dir)=>{
    const rutafinal = dir.replace(/\\\\/g, "\\");
    exec(`explorer.exe "${rutafinal}"`);
    
  })