const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs'); // Import fs module

// Define paths
const inputPath = path.join(__dirname, 'SampleVideo.mp4'); // Ensure the file extension is included
const outputDir = path.join(__dirname, 'output');    // Directory for output files

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

ffmpeg.setFfmpegPath(ffmpegPath);

const resolutions = [
  { name: '144p', size: '256x144' },
  { name: '240p', size: '426x240' },
  { name: '360p', size: '640x360' },
  { name: '480p', size: '854x480' },
  { name: '720p', size: '1280x720' },
  { name: '1080p', size: '1920x1080' },
];

resolutions.forEach(resolution => {
  ffmpeg(inputPath)
    .output(path.join(outputDir, `${resolution.name}.mp4`))
    .videoCodec('libx264')
    .size(resolution.size)
    .on('end', () => {
      console.log(`Finished transcoding to ${resolution.name}`);
    })
    .on('error', err => {
      console.error(`Error transcoding to ${resolution.name}:`, err.message);
    })
    .run();
});
