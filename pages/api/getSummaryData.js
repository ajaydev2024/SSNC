// pages/api/getSummaryData.js
import fs from 'fs/promises';
import { join } from 'path';

const readJSFile = async (fileName) => {
  try {
    const dirPath = join(process.cwd(), 'public', 'Summary');
    const filePath = join(dirPath, fileName);

    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error('Error reading file:', error);
    return null; // Return null to indicate an error
  }
};


  export default readJSFile