# Youtube Download

Este proyecto es una implementación de las librerías youtube-dl-exec para la descarga y fluent-ffmpeg para realizar conversiones. El mismo permite crear un ejecutable para el sistema Windows que puede realizar descargas de videos teniendo en cuenta la calidad que desee el usuario. Este proyecto está montado sobre Electron.js y es una práctica de aprendizaje autodidacta.


## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Nota](#nota)
- [Ayuda](#ayuda)

## Instalación

Para la instalacion del proyecto deber descargar por separado el binario de ffmpeg de este link [https://www.videohelp.com/download/ffmpeg-6.1.1-full_build.7z]

Una ves descargado debes descomprimirlo y crear  dentro de src/utils una carpeta llamda ffmpeg y deberas colocar el archivo que sencuentra en la carpeta bin llamado ffmpeg.exe dentro de la carpeta del mismo nombre

```bash
git clone https://github.com/Eiine/youtubeDownloader.git

npm install 
```

## uso

```bash
npm start //Esto ejecutara el proyecto en local
npm run pack // Genera el ejecutable dentro de out
npm run dist // Genera el ejecutable dentro de out // instalador empaquetado
```


## nota

Se debera tener en cuenta que para ejecutar el proyecto en local, es necesario cambiar dentro de la carpeta utils en el archivo downloadFull en la linea 32 el contenido de la variable dir lo mismo para el archivo downloadAudio en linea 30, esto permitira el correcto funcionamiento en local como en el empaquetado segun sea el caso.


![Interfaz](https://i.postimg.cc/qBXfcB4g/1.png)

## ayuda

Si necesitas ayuda con la instalacion o solo quieres contactarte conmigo por favor envia un email a este correo yannokaiserfrom@gmail.com estare gustoso de ayudarte.
