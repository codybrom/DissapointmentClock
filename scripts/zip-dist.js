const fs = require('fs');
const archiver = require('archiver');
const {name} = require('../package.json'); // Update the path to package.json

const timestamp = Math.floor(Date.now() / 1000); // Get current time in Unix format

const outputFolder = 'out'; // Name of the output folder
const outputFilePath = `${outputFolder}/${name}-${timestamp}.zip`; // Path to the output zip file

// Create the output folder if it does not exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const output = fs.createWriteStream(outputFilePath);
const archive = archiver('zip', {zlib: {level: 9}});

output.on('close', () => {
  console.log(`Successfully zipped the dist folder. Output file: ${outputFilePath}`);
});

archive.on('error', err => {
  throw err;
});

archive.pipe(output);
archive.directory('dist/', false); // Update the path to the dist folder
archive.finalize();
