const fs = require('fs');
const path = require('path');

// List of directories to process
const directories = [
  '/Users/yannickromainsegaar/react-chat/packages/react-chat/src/components/MainMenuButton',
  '/Users/yannickromainsegaar/react-chat/packages/react-chat/src/components/Modal',
  '/Users/yannickromainsegaar/react-chat/packages/react-chat/src/components/ConfirmationDialog',
  '/Users/yannickromainsegaar/react-chat/packages/react-chat/src/components/Footer',
];
const outputFile = path.resolve(__dirname, 'MainMenu__Modal_ConfirmationDialog_Footer_codes.txt');

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

// Concatenate relevant files into react_chat_codes.txt
const concatenateFiles = () => {
  const writeStream = fs.createWriteStream(outputFile);

  directories.forEach(dir => {
    const files = readFiles(dir);
    files.forEach(file => {
      const data = fs.readFileSync(file, 'utf-8');
      writeStream.write(`\n\n// File: ${file}\n\n`);
      writeStream.write(data);
    });
  });

  writeStream.end();
};

concatenateFiles();
console.log(`Knowledgebase created at ${outputFile}`);