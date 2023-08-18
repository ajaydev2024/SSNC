// src/utils/readFileforBatch.js
import fs from 'fs/promises';
import path from 'path';

const readJSFile = async (filePath) => {
  try {
    // eslint-disable-next-line node/no-template-curly-in-string
    const fileContent = await fs.readFile(path.join(filePath), 'utf-8');
    return fileContent;
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

export default readJSFile;
