import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { readdir, readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import readFile from '@/utils/readFileforBatch';

const Summary = ({ jsonItem }) => {
  console.log("Summary.js : ",jsonItem)
  useEffect(() => {
    const container = document.querySelector('.accordion-container');
    const toggleAccordion = (event) => {
      const accordionButton = event.target.closest('.accordion');
      if (accordionButton) {
        accordionButton.classList.toggle('active');
        const panel = accordionButton.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }
    };

    container.addEventListener('click', toggleAccordion);

    return () => {
      container.removeEventListener('click', toggleAccordion);
    };
  }, []);
  return (
    <div id="batch">
      <Navbar />
      <h1 className="text-center text-2xl">Summary Page of Every Item</h1>
      <div className="accordion-container">
    {  Object.keys(jsonItem[0]).map((key, index) => (         
         <div className="list-decimal" key={index}>
            <button className="accordion cursor-pointer rounded-lg font-bold">
              {jsonItem[0]["Weight"]}
            </button>
            <div className="panel">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Servings (in Grams)</th>
                      <th>{jsonItem.boxes}</th>
                      <th>{jsonItem.batch1}</th>
                      <th>{jsonItem.batch2}</th>
                      <th>{jsonItem.batch3}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jsonItem.itemData?.map((innerItem, innerIndex) => (
                      <tr key={innerIndex}>
                        <td>{innerItem.name}</td>
                        <td>{innerItem.servings || ''}</td>
                        <td>{jsonItem.boxElements[innerIndex] || ''}</td>
                        <td>{jsonItem.batch1Elements[innerIndex] || ''}</td>
                        <td>{jsonItem.batch2Elements[innerIndex] || ''}</td>
                        <td>{jsonItem.batch3Elements[innerIndex] || ''}</td>
                      </tr>
                    ))}
                    <tr className="text-green-500 text-3xl font-extrabold">
                      <td>Total :</td>
                      <td>{jsonItem.totalServings}</td>
                      <td>{jsonItem.totalBoxElements}</td>
                      <td>{jsonItem.totalBatch1Elements}</td>
                      <td>{jsonItem.totalBatch2Elements}</td>
                      <td>{jsonItem.totalBatch3Elements}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="w-1/3">
                  <thead>
                    <tr>
                      <th>Packaging Material</th>
                      <th>Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Product Items */}
                    {jsonItem.itemData.map((innerItem, innerIndex) => {
                      if (innerItem.name) {
                        return null; // Skip rendering if item.name exists
                      }
                      return (
                        <tr key={innerIndex}>
                          <td>{innerItem.PackagingName}</td>
                          <td>
                            {innerItem.PackagingName === 'Carton 19oz - 12pk' ? (
                              <span className="text-center">
                                {jsonItem.boxes || jsonItem.batch1 || jsonItem.batch2 || jsonItem.batch3 ? (
                                  (parseFloat(jsonItem.boxes || jsonItem.batch1 || jsonItem.batch2 || jsonItem.batch3) / 12).toFixed(1)
                                ) : (
                                  ''
                                )}
                              </span>
                            ) : (
                              <span className="text-center">
                                {jsonItem.boxes || jsonItem.batch1 || jsonItem.batch2 || jsonItem.batch3}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>


                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

//  <ExcelExportButton sheets={jsonData.map(item => ({ sheetName: item.selectedItem, data: item.itemData }))} />

export default Summary;

export async function getServerSideProps() {
  try {
    const dirPath = join(process.cwd(), 'public', 'Summary'); // Path to the directory containing JSON files
    const fileNames = await readdir(dirPath);

    const jsonData = await Promise.all(
      fileNames.map(async (fileName) => {
        const ext = extname(fileName);
        if (ext === '.json') {
          const filePath = join(dirPath, fileName);
          try {
            const contentBuffer = await readFile(filePath);
            const content = contentBuffer.toString(); // Convert buffer to string
            const parsedContent = JSON.parse(content);
            const stats = await stat(filePath); // Get file stats

            return {
              fileName: fileName.substring(0, fileName.length - ext.length),
              creationDate: stats.birthtime, // Use the creation date of the file
              ...parsedContent, // Include the parsed content
            };
          } catch (readError) {
            console.error(`Error reading or parsing file ${fileName}:`, readError);
            return null;
          }
        }
        return null;
      })
    );

    const validJsonData = jsonData.filter(data => data !== null);

    // Sort the jsonData array based on creationDate
    const sortedJsonData = validJsonData.sort((a, b) => b.creationDate - a.creationDate);

    return {
      props: {
        jsonData: sortedJsonData,
      },
    };
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    return {
      props: {
        jsonData: [],
      },
    };
  }
}

