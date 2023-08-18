import path from 'path';
import vm from 'vm';
import readJSFile from '@/utils/readFileforBatch';

async function DataFetcher (context) {
  let { selectedItem } = context.query;
  selectedItem = decodeURIComponent(selectedItem);

  if (!selectedItem) {
    return null;
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'JSONData', 'ProductList',`${selectedItem}`);
    console.log('File Path:', filePath);

    // Use the readJSFile utility to read the file content
    const fileContent = await readJSFile(filePath);

    // Create a new sandbox context using vm module
    const sandbox = { module: {} };
    vm.createContext(sandbox);
    vm.runInContext(fileContent, sandbox);

    // Call the exported function to retrieve the productItems
    const getProductItems = sandbox.module.exports.getProductItems;
    const selectedItemData = getProductItems();

    return selectedItemData.length > 0 ? selectedItemData : null;
  } catch (error) {
    console.error('Error fetching item data:', error);
    return null;
  }
}

export default DataFetcher ;
