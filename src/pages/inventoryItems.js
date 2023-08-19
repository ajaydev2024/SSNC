import React, { useEffect } from 'react';
import { readdir, readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import Navbar from '@/components/Navbar';
import ExcelExportButton from './api/ExcelExportButton';
import { useInventory } from '@/components/InventoryContext';


const InventoryItems = ({ itemData }) => {
    const { state } = useInventory();
    const { inventory } = state;
 
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
    const sheets = itemData.map(item => ({ sheetName: item.title, data: item.materials.filter(material => material.value !== null), }));

    return (
        <div id='inventoryPage'>
            <Navbar />
            <h1 className='text-center text-2xl'>All Inventory List</h1>
            <div className="accordion-container">
                {itemData.length > 0 && (
                    <div className="list-decimal text-center bg-white rounded-lg mt-8 p-4 ">
                        {itemData.map((item, index) => (
                            <div className='list-decimal' key={index}>
                                <button className="accordion cursor-pointer rounded-lg font-bold">
                                    {index + 1}): {item.title}
                                </button>
                                <div className="panel">

                                    <div className="table-responsive">
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>Material</th>
                                                    <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.materials.map((material, i) => (
                                                    material.value !== null && (
                                                        <tr key={i}>
                                                            <td>{material.name}</td>
                                                            <td>{material.value}</td>
                                                        </tr>
                                                    )
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ExcelExportButton sheets={sheets} />

        </div>
    );
};

export async function getServerSideProps(context) {
    try {
        const dirPath = join(process.cwd(), 'src', 'JSONData', 'InventoryList');
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

        const validJsonFileContents = fileStats
            .filter(content => content !== null)
            .sort((a, b) => a.stat.birthtimeMs - b.stat.birthtimeMs) // Sort by creation date
            .map(async content => {
                const { fileName } = content;
                const filePath = join(dirPath, fileName);
                try {
                    const contentBuffer = await readFile(filePath);
                    const contentString = contentBuffer.toString(); // Convert buffer to string
                    const parsedContent = JSON.parse(contentString);
                    const materials = Object.entries(parsedContent)
                        .filter(([key, value]) => key !== 'title')
                        .map(([name, value]) => ({ name, value }));
                    return { title: parsedContent.title, materials };
                } catch (readError) {
                    console.error(`Error reading or parsing file ${fileName}:`, readError);
                    return null;
                }
            });

        const validJsonFileContentsResolved = await Promise.all(validJsonFileContents);

        return {
            props: {
                itemData: validJsonFileContentsResolved.filter(content => content !== null),
            },
        };
    } catch (error) {
        console.error('Error fetching item data:', error);
        return {
            props: {
                itemData: [],
            },
        };
    }
}

export default InventoryItems;
