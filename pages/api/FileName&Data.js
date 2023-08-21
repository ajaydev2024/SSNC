import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dirPath = path.join(process.cwd(), '/JSONData');

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Error reading files:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const fileData = files.map((fileName) => {
      const filePath = path.join(dirPath, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      console.log('File content for', fileName, ':', fileContent);
      
      return { name: fileName, content: fileContent };
    });

    res.status(200).json(fileData);
  });
}
