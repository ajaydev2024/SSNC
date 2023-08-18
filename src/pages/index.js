import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import HomeBrands from '@/components/HomeBrands';
import { useBrandContext } from '@/components/BrandContext';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { selectedBrand } = useBrandContext();

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (response.status === 200) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Error searching files:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching files:', error);
    }
  };

  useEffect(() => {
    // Update the searchQuery whenever the selectedBrand changes
    setSearchQuery(selectedBrand || '');
  }, [selectedBrand]);

  useEffect(() => {
    if (searchQuery !== '') {
      handleSearch(searchQuery);
    }
  }, [searchQuery, selectedBrand]);

  const handleItemClick = (item) => {
    setSearchQuery(item.slice(0, item.length - 3));
    router.push({
      pathname: '/batch',
      query: { selectedItem: item },
    });    
   console.log('Encoded Item:', item);
};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="z-10 w-full max-w-5xl items-center  justify-between font-mono text-sm">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <input
            type="text"
            className="font-bold text-green-400 sm:text-md  md:text-lg lg:text-2xl rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Item Name"
          />
        </div>


        {searchQuery !== '' && (
          <ul className="text-center bg-grey-500 rounded-lg mt-8 p-4">
            {searchResults.map((fileName, index) => {
              return (
                <li
                  className='font-semibold cursor-pointer rounded-lg'
                  key={index}
                  onClick={() => handleItemClick(encodeURIComponent(fileName))} // Encode the filename
                >
                  {fileName.slice(0, fileName.length - 3)}
                </li>
              );
            })}
          </ul>
        )}

      </div>
      <HomeBrands />
      <div className="relative flex place-items-center before:absolute befora:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/Logo.png"
          alt="Next.js Logo"
          width={280}
          height={37}
          priority
        />
      </div>

      <Navbar />
    </main>
  );
}
