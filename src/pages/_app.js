import '@/styles/globals.css';
import '@/styles/inventoryItems.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Example of accessing router properties
  useEffect(() => {   
  }, [router]);

  return <Component {...pageProps} />;
}
