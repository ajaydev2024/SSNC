// File: pages/api/getItemData.js

import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), '/public/Summary');

export default function handler(req, res) {
  const { itemName } = req.query;

  if (!itemName) {
    return res.status(400).json({ error: 'Item name is required' });
  }

  // Construct the path to the file based on the itemName
  const itemFilePath = path.join(dataDirectory, `${itemName}.js`); // Append ".js" to the item name

  // Check if the file exists
  if (fs.existsSync(itemFilePath)) {
    try {
      // Read the contents of the file
      const selectedItemData = fs.readFileSync(itemFilePath, 'utf-8');
      const parsedData = JSON.parse(selectedItemData);

      res.status(200).json(parsedData);
    } catch (error) {
      console.error('Error parsing item data:', error);
      res.status(500).json({ error: 'Error parsing item data' });
    }
  } else {
    res.status(404).json({ error: 'Item not found in Public Folder' });
  }
}
