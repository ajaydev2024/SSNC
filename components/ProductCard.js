import React ,{useEffect} from 'react';
import Client from 'shopify-buy';

const ProductCard = ({ product }) => {
  useEffect(() => {
    async function setCountryInCheckout() {
      try {
        const shop = await client.shop.fetchInfo();

        const shopCountry = shop.countryCode;

        const checkout = await client.checkout.create();

        // Set the shop's country in the checkout
        await client.checkout.updateAttributes(checkout.id, {
          country: shopCountry,
        });
      } catch (error) {
        console.error('Error setting shop country in checkout:', error);
      }
    }

    setCountryInCheckout();
  }, []);

  const client = Client.buildClient({
    domain: 'flex-wheeler.myshopify.com',
    storefrontAccessToken: '654ba1b2fc5161d5e9c92d68adc8bda4',
  });

  const addToCart = async () => {
    try {
        const variantId = product.variants[0].id;

        // Construct the cart URL
        const cartUrl = `https://flex-wheeler.myshopify.com/cart/${variantId}:1`;
  
        // Redirect to the cart URL
        window.location.href = cartUrl;
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

  const truncatedBodyHtml = product.body_html.substring(0, product.body_html.indexOf('</p>', product.body_html.indexOf('</p>') + 1) + 140); // Truncate to the first 2 lines

  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 product-card cursor-pointer">
      <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: truncatedBodyHtml }} />
      <p className="text-lg font-semibold mb-2">Price: ₹{product.variants[0].price}</p>
      <img
        src={product.images[0].src}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-2 product-image"
      />
      <button
        onClick={addToCart}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
