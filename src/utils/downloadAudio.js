const youtube_dl=require("youtube-dl-exec");
const path = require("path")
const fs = require("fs")
const ffmpeg=require("fluent-ffmpeg")
const rootDri=require("./alias")
ffmpeg.setFfmpegPath(
  path.join(__dirname, "/ffmpeg", "ffmpeg.exe")
);

const downloadAudio=async(url,output,event,quality)=>{

    option= {
        extractAudio: true,
        
       }

    let data= await youtube_dl(url,option) 
    .then(async(output) => {
     
      let title= await youtube_dl(url,{dumpSingleJson: true,})
      return {status:true, title:title.title}
      })
    .catch((error) => {
      console.error("Error al descargar el video: Si estas utilizando una url de mix youtube, este programa no es compatible o por el contrario una url de otro sitio no todos lo son con esta app");
    })
    
    const fileRead=fs.readdirSync(rootDri)
        const Ppalabra= data.title.split(" ")[0]
        const file= fileRead.filter(file=> file.includes(Ppalabra))
    
    ffmpeg(path.join(rootDri, file[0]))
    .audioCodec("libmp3lame") // Puedes cambiar el códec según tus necesidades
    .toFormat("mp3")
    .save(path.join( `${output}`, `${data.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')}.mp3`))
    .on("end", () => {
    console.log("Extracción de audio completada.");
    file.map((element)=>{
        fs.unlinkSync(path.join(rootDri, element))
      })
      event.sender.send("final-progres","final")
  })
  .on("error", (err) => {
    console.error("Error al extraer audio:", err);
  })
  
}

module.exports=downloadAudio