
const {ipcRenderer} = require("electron")

window.addEventListener('DOMContentLoaded', () => {

  // se pueden asignar las funciones en preload
  const boton = document.getElementById("boton");
  const link=document.getElementById("download")
  const folder=document.getElementById("folder")
  const download_button=document.getElementById("download-button")
  const cont_progres=document.getElementById("conten-progress")
  const openFolder=document.getElementById("open-folder")
  const option= document.getElementById("quality")
  window.ipcRenderer=ipcRenderer
  console.log(boton);
  boton.addEventListener("click", () => {
    ipcRenderer.send("openDounloadDirectori","select directori")
    
  });
  //muestra el directorio donde se va a guardar la descarga
  
  
  ipcRenderer.on("returnDirectori",(e,data)=>{
    folder.value=data
  })
  //recibe la ruta gurdada con el destino de descarga
  ipcRenderer.on("config-info",(e,dest)=>{
    let folderDestini= JSON.parse(dest)
    folder.value=folderDestini.destination
  })

  //copiar contenido de portapapeles en input



link.addEventListener("click",async()=>{
  const clipboardContent = await navigator.clipboard.readText()
    link.value = clipboardContent;
})

//Descarga de video
download_button.addEventListener("click",()=>{
  if(!folder.value || !link.value){
    return console.log("se requiere un link para iniciar la descarga");
  }
  ipcRenderer.send("start-donwload",{folder:folder.value, link:link.value, quality:option.value})
  //corregir la barra de progreso para que de una idea de descarga terminada
  link.value=""
  ipcRenderer.on("send-title",(e,title)=>{
    console.log(title);
    cont_progres.innerHTML+=`<h2 class="item-video">${title}</h2>`
  })

  ipcRenderer.on("final-progres",()=>{
  let items=document.querySelector(".item-video")
  
 
    if (!items.classList.contains("final")) {
      items.classList.add("final");
    }
  
  });
  
})

openFolder.addEventListener("click",()=>{
  ipcRenderer.send("openFolder", folder.value)
})

});

