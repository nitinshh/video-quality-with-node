
/*
npm install express fluent-ffmpeg ffmpeg-static
npm install concurrently --save-dev

in package.json=>        
    
    "start": "concurrently \"npm run transcode\" \"npm run server\"",
    "transcode": "node transcode.js",
    "server": "node server.js"
*/ 



const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const outputDir = path.join(__dirname, 'output');

app.use(express.static(outputDir));

app.get('/', (req, res) => {
  res.send(`
    <h1>Video Quality Selector</h1>
    <video id="videoPlayer" width="640" controls>
      <source src="720p.mp4" type="video/mp4">
    </video>
    <br>
    <button onclick="setQuality('144p')">144p</button>
    <button onclick="setQuality('240p')">240p</button>
    <button onclick="setQuality('360p')">360p</button>
    <button onclick="setQuality('480p')">480p</button>
    <button onclick="setQuality('720p')">720p</button>
    <button onclick="setQuality('1080p')">1080p</button>
    <script>
      function setQuality(quality) {
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = quality + '.mp4';
        videoPlayer.play();
      }
    </script>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
