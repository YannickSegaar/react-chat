const fs = require('fs');
const path = require('path');

// Adjust the base directory to the 'src' directory
const baseDir = path.resolve(__dirname, 'packages/react-chat/src'); 
const outputFile = path.resolve(__dirname, 'knowledgebase_new.txt');

// List of file extensions to include
const includeExtensions = ['.js', '.jsx', '.ts', '.tsx']; // Include other relevant extensions

// Function to read files recursively
const readFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      readFiles(filePath, fileList);
    } else if (includeExtensions.includes(path.extname(file))) {
      fileList.push(filePath);
    }
  });
  return fileList;
};

// Concatenate relevant files into knowledgebase.txt
const concatenateFiles = () => {
  const files = readFiles(baseDir);
  const writeStream = fs.createWriteStream(outputFile);

  files.forEach(file => {
    const data = fs.readFileSync(file, 'utf-8');
    writeStream.write(`\n\n// File: ${file}\n\n`);
    writeStream.write(data);
  });

  writeStream.end();
};

concatenateFiles();
console.log(`Knowledgebase created at ${outputFile}`);