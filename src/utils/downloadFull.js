const youtube_dl=require("youtube-dl-exec");
const path = require("path")
const fs = require("fs")
const ffmpeg=require("fluent-ffmpeg")
const rootDri=require("./alias")
ffmpeg.setFfmpegPath(
  path.join(__dirname, "/ffmpeg", "ffmpeg.exe")
);
//corregir errores con nombre similadres
const convert=async(url,output,event,quality)=>{
   option= {
      // calidades 480-low, 720-medium, 1080-height
      format:`bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
      mergeOutputFormat: 'mp4',
      
     }
  
       let data= await youtube_dl(url,{dumpSingleJson: true,}) 
      .then(async(output) => {
       
        event.sender.send("send-title",output.title)
         await youtube_dl(url,option)
        return {status:true, title:output.title}
        })
      .catch((error) => {
        console.error("Error al descargar el video: Si estas utilizando una url de mix youtube, este programa no es compatible o por el contrario una url de otro sitio no todos lo son con esta app");
        event.sender.send("error",err)
      })
    
     if(data.status== true){
          // Cambiar el contenido de dir por rootDir en abiente desarrollo
          const dir=path.join(rootDri,"..","..")
          const fileRead=fs.readdirSync(dir)
          const Ppalabra= data.title.split(" ")[0]
          const file= fileRead.filter(file=> file.includes(Ppalabra)) 
        
        ffmpeg()
        .input(path.join(dir, file[0]))
        .input(path.join(dir, file[1]))
        .output(path.join( `${output}`, `${data.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')}.mp4`))
          
          .on("end", () => {
            console.log(`Conversión completa para ${file}`);
            file.map((element)=>{
              fs.unlinkSync(path.join(dir, element))
            })
            event.sender.send("final-progres","final")
          })
          .on("error", (err) => {
            console.error(`Error en la conversión para ${file}:`, err);
            event.sender.send("error",err)
            path.join( `${output}`, `${data.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')}.mp4`)
          })
          .run();
     }
    }

    //crerar una segunda funcion que se encarge solo de sacar el audio

    module.exports=convert
