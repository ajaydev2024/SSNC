// BrandContext.js
import React, { createContext, useContext, useState } from 'react';

const BrandContext = createContext();

export function BrandProvider({ children }) {
  const [selectedBrand, setSelectedBrand] = useState(null);
   console.log("1",selectedBrand);
  return (
    <BrandContext.Provider value={{ selectedBrand, setSelectedBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrandContext() {
  return useContext(BrandContext);
}
