export default async function handler(req, res) {
    try {
      const shopifyAPIURL = 'https://flex-wheeler.myshopify.com/admin/api/2023-07/products.json';
      const apiKey = 'e645eed0cf1c530339f28d6e0267d3b4';
      const apiPassword = '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';
      
      const response = await fetch(shopifyAPIURL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiPassword}`).toString('base64')}`
        }
      });
  
      const data = await response.json();
      res.status(200).json(data.products || []);
    } catch (error) {
      console.error('Error fetching Shopify data:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  