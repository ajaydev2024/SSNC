import React, { useEffect } from 'react';
import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import Navbar from '@/components/Navbar';
import ExcelExportButton from './api/ExcelExportButton';

const InventoryItems = ({ itemData }) => {
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
    const sheets = itemData.map(item => ({sheetName: item.title, data: item.materials.filter(material => material.value !== null), }));

    return (
        <div id='inventoryPage'>
            <Navbar />
            <h1 className='text-center text-2xl'>All Products List</h1>
            <div className="accordion-container">
                {itemData.length > 0 && (
                    <div className="list-decimal text-center bg-white rounded-lg mt-8 p-4 ">
                        {itemData.map((item, index) => (
                            <div className='list-decimal' key={index}>
                                <button className="accordion cursor-pointer rounded-lg font-bold">
                                   {index+1}): {item.title}
                                </button>
                                <div className="panel">

                                <div className="table-responsive">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Material</th>
                                                <th>Servings (in Grams)</th>
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
        const dirPath = join(process.cwd(), 'src', 'JSONData','InventoryList');
        const fileNames = await readdir(dirPath);

        const jsonFileContents = await Promise.all(
            fileNames.map(async (fileName) => {
                const ext = extname(fileName);
                if (ext === '.json') {
                    const filePath = join(dirPath, fileName);
                    try {
                        const contentBuffer = await readFile(filePath);
                        const content = contentBuffer.toString(); // Convert buffer to string
                        const parsedContent = JSON.parse(content);
                        console.log("Final File : ", parsedContent);
                        return { fileName, content: parsedContent };
                    } catch (readError) {
                        console.error(`Error reading or parsing file ${fileName}:`, readError);
                        return null;
                    }
                }
                return null;
            })
        );

        const validJsonFileContents = jsonFileContents
            .filter(content => content !== null)
            .map(content => {
                const { fileName, content: parsedContent } = content;
                const materials = Object.entries(parsedContent)
                    .filter(([key, value]) => key !== 'title')
                    .map(([name, value]) => ({ name, value }));
                return { title: parsedContent.title, materials };
            });

        return {
            props: {
                itemData: validJsonFileContents,
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
