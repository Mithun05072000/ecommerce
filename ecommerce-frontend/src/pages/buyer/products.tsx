import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/buyer/products', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data.map((i: any) => ({ ...i, quantity: 1 })));
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId: number, quantity: number) => {
    try {
      const response = await fetch('http://localhost:5000/buyer/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        alert('Product added to cart');
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const increaseQuantity = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const redirectToCart = () => {
    router.push('/buyer/cart');
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 relative">
      {/* Cart button in the top-right corner */}
      <button
        onClick={redirectToCart}
        className="absolute top-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Cart
      </button>

      <h2 className="text-3xl mb-8 font-bold text-center text-gray-800">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-gray-800 mb-6">${product.price}</p>
              {/* Quantity controls */}
              <div className="flex items-center justify-between mb-6 border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="bg-gray-200 text-gray-600 px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  -
                </button>
                <p className="text-lg font-medium px-4 py-2 bg-gray-100 text-gray-800">{product.quantity}</p>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="bg-gray-200 text-gray-600 px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addToCart(product.id, product.quantity)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 w-full"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
