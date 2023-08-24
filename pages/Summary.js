import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { readdir, readFile, stat } from 'fs/promises';
import { join, extname } from 'path';

export async function getServerSideProps() {
  try {
    const dirPath = join(process.cwd(), 'public', 'Summary');
    const fileNames = await readdir(dirPath);

    const fileStatsPromises = fileNames.map(async (fileName) => {
      const ext = extname(fileName);
      if (ext === '.json') {
        const filePath = join(dirPath, fileName);
        try {
          const contentStat = await stat(filePath);
          return { fileName, stat: contentStat };
        } catch (statError) {
          console.error(`Error getting file stat for ${fileName}:`, statError);
          return null;
        }
      }
      return null;
    });

    const fileStats = await Promise.all(fileStatsPromises);

    const validJsonFileContents = await Promise.all(
      fileStats
        .filter(content => content !== null)
        .sort((a, b) => a.stat.birthtimeMs - b.stat.birthtimeMs) // Sort by creation date
        .map(async content => {
          const { fileName } = content;
          const filePath = join(dirPath, fileName);
          try {
            const contentBuffer = await readFile(filePath);
            //    const contentString = contentBuffer.toString();  Convert buffer to string
            const parsedContent = JSON.parse(contentBuffer);
            return { ...parsedContent };
          } catch (readError) {
            console.error(`Error reading or parsing file ${fileName}:`, readError);
            return null;
          }
        })
    );

    const validJsonFileContentsResolved = validJsonFileContents.filter(content => content !== null);

    return {
      props: {
        summaryItem: validJsonFileContentsResolved,
      },
    };
  } catch (error) {
    console.error('Error fetching item data:', error);
    return {
      props: {
        summaryItem: [],
      },
    };
  }
}


const Summary = ({ summaryItem }) => {
  console.log("summaryItem", summaryItem);
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
      {summaryItem.map((jsonItem, index) => (
        <div className="list-decimal" key={index}>
          <button className="accordion cursor-pointer rounded-lg font-bold">
            {jsonItem.selectedItem}
          </button>
          <div className="panel">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Quantity</th>
                    <th>{jsonItem.boxes}</th>
                    <th>{jsonItem.batch1}</th>
                    <th>{jsonItem.batch2}</th>
                    <th>{jsonItem.batch3}</th>
                  </tr>
                </thead>
                <tbody>
                  {jsonItem.itemData[1] && (
                    <tr>
                      {Object.keys(jsonItem.itemData[1]).map((key, index) => (
                        <td key={index} >{key}</td>
                      ))}
                    </tr>
                  )}
                  {jsonItem.itemData.map((item, innerIndex) => (
                    <tr key={innerIndex}>
                      {Object.values(item).map((value, valueIndex) => (
                        <td key={valueIndex}>{value !== null ? value : 'N/A'}</td>
                      ))}
                      <td>{jsonItem.boxElements[innerIndex + 1]}</td>
                      <td>{jsonItem.batch1Elements[innerIndex + 1]}</td>
                      <td>{jsonItem.batch2Elements[innerIndex + 1]}</td>
                      <td>{jsonItem.batch3Elements[innerIndex + 1]}</td>
                    </tr>
                  ))}
                  <tr className="text-green-500 text-3xl font-extrabold">
                    <td>Total :</td>
                    <td></td>
                    <td></td>
                    <td>{jsonItem.totalBoxElements}</td>
                    <td>{jsonItem.totalBatch1Elements}</td>
                    <td>{jsonItem.totalBatch2Elements}</td>
                    <td>{jsonItem.totalBatch3Elements}</td>
                  </tr>
                </tbody>
              </table>
              <table className='w-1/3 pb-4'>
                <thead>
                  <tr className='pb-4'>
                    <th>Packaging Material</th>
                    <th>Requirements</th>
                  </tr>
                </thead>
               
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Summary;
