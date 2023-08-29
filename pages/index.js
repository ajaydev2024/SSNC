import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Index = () => {
  const [shopifyData, setShopifyData] = useState([]);

  useEffect(() => {
    const fetchShopifyData = async () => {
      try {
        const response = await fetch('/api/getShopifyData');
        const data = await response.json();
        setShopifyData(data || []);
      } catch (error) {
        console.error('Error fetching Shopify data:', error);
      }
    };

    fetchShopifyData();
  }, []);

  return (
    <>
    <h1>Fetching Products  from <a href='https://flexwheelernutrition.com/'></a>flexwheelernutrition.com (Third party apps) </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
     
      {shopifyData.length > 0 ? (
        shopifyData.map((product, index) => (
          
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>Data is Loading</p>
      )}
    </div>
    </>
  );
};

export default Index;
