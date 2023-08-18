// utils/readJSFile.js
import fs from 'fs/promises';

const readJSFile = async (filePath) => {
  try {
    const fileContent = await readJSFile(filePath);   
    return fileContent;
    
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

export default readJSFile;
