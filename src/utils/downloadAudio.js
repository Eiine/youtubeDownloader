const youtube_dl=require("youtube-dl-exec");
const path = require("path")
const fs = require("fs")
const ffmpeg=require("fluent-ffmpeg")
const rootDri=require("./alias")
ffmpeg.setFfmpegPath(
  path.join(__dirname, "/ffmpeg", "ffmpeg.exe")
);

const downloadAudio=async(url,output,event,quality)=>{

  //extrae el titulo primero
  let title= await youtube_dl(url,{dumpSingleJson: true,})
  event.sender.send("send-title",title.title)

    option= {
        extractAudio: true,
        
       }

    let data= await youtube_dl(url,option) 
    .then(async(output) => {
      return {status:true, title:title.title}
      })
    .catch((error) => {
      console.error("Error al descargar el video: Si estas utilizando una url de mix youtube, este programa no es compatible o por el contrario una url de otro sitio no todos lo son con esta app");
    })
    
    // Cambiar el contenido de dir por rootDir en abiente desarrollo
    const dir=path.join(rootDri,"..","..")
    const fileRead=fs.readdirSync(dir)
        const Ppalabra= data.title.split(" ")[0]
        const file= fileRead.filter(file=> file.includes(Ppalabra))
    
    ffmpeg(path.join(dir, file[0]))
    .audioCodec("libmp3lame") // Puedes cambiar el códec según tus necesidades
    .toFormat("mp3")
    .save(path.join( `${output}`, `${data.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')}.mp3`))
    .on("end", () => {
    console.log("Extracción de audio completada.");
    file.map((element)=>{
        fs.unlinkSync(path.join(dir, element))
      })
      event.sender.send("final-progres","final")
  })
  .on("error", (err) => {
    console.error("Error al extraer audio:", err);
  })
  
}

module.exports=downloadAudio