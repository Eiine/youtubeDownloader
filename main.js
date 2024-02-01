const { app, BrowserWindow, ipcMain, dialog, shell, Tray } = require('electron')
const { exec } = require('child_process');
const path = require("path")
const fs= require("fs")
const convert= require("./src/utils/downloadFull")
const downloadAudio= require("./src/utils/downloadAudio")
const alias = require("./src/utils/alias")
const createWindow = () => {
  const dirIcon=path.join(__dirname,"/src","/imagen", "yd.png")
  const appIcon = new Tray(dirIcon)

    const win = new BrowserWindow({
      width: 900,
      height: 600,
      resizable: false, // Esta opción evita que la ventana sea redimensionable
      icon:dirIcon,
      webPreferences: {
        preload: path.join(__dirname, "/src","preloads", 'preload.js')
      }
    })
    
    win.setMenu(null)
    win.loadFile(path.join(__dirname, "/src","/views", "index.html"))

    const dest = fs.readFileSync(path.join(alias, "/src", "config", "config.json"), "utf-8");
    win.webContents.on('did-finish-load', () => {
        win.webContents.send("config-info", dest);
    });
  }

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
   // comprueba el archivo config buscando una ruta definida de descaga anterior

    const dest=fs.readFileSync(path.join(alias, "/src", "config", "config.json"),"utf-8")
    
     //abre el cuadro de dialogo para seleccionar una carpeta
  
  ipcMain.on("openDounloadDirectori",(event)=>{
    try{

      let data=dialog.showOpenDialogSync({properties:["openDirectory"]})
    
      const dir= JSON.parse(dest)
    dir.destination=data[0]

    fs.writeFileSync(path.join(alias, "/src", "config", "config.json"),JSON.stringify(dir), "utf-8")
    //envia la ruta para ser mostrada en pantalla
    event.sender.send("returnDirectori",data[0])
    }catch{
      console.log("No se selecciono un directorio");
    }
    
    
    
  })

  ipcMain.on("start-donwload",(event,data)=>{
    if(data.quality=="only-audio"){
      console.log("comensando la descarga de audio");
      return downloadAudio(data.link.replace(/&.*$/, ''), data.folder, event,data.quality) 
    }
    convert(data.link.replace(/&.*$/, ''), data.folder, event,data.quality)
  })
 
  ipcMain.on("openFolder",(event,dir)=>{
    const rutafinal = dir.replace(/\\\\/g, "\\");
    exec(`explorer.exe "${rutafinal}"`);
    
  })