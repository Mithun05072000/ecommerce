import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/buyer/cart', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productId: number) => {
    try {
      await fetch(`http://localhost:5000/buyer/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCartItems(cartItems.filter((item: any) => item.id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div className="max-w-4xl mx-auto space-y-6">
          {cartItems.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-2">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
