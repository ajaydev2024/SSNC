// utils/readJSFile.js
import fs from 'fs/promises';

const readJSFile = async (filePath) => {
  try {
   const fileContent = await fs.readFile(filePath, 'utf-8');
   
    return fileContent;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

export default readJSFile;
