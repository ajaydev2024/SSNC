import path from 'path';
import readJSFile from '@/utils/readFileforBatch';

async function DataFetcher(context) {
  let { selectedItem } = context.query;
  selectedItem = decodeURIComponent(selectedItem);

  if (!selectedItem) {
    return null;
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'JSONData', 'ProductList', `${selectedItem}`);
    console.log('File Path:', filePath);

    // Use the readJSFile utility to read the file content
    const fileContent = await readJSFile(filePath);
    console.log("fileContent of Batch.js : ",fileContent)
    // Parse the file content as JSON
    const selectedItemData = JSON.parse(fileContent);
  console.log("FileDar of Batch.js : ",selectedItemData)
    return Array.isArray(selectedItemData) && selectedItemData.length > 0 ? selectedItemData : null;
  } catch (error) {
    console.error('Error fetching item data:', error);
    return null;
  }
}

export default DataFetcher;
