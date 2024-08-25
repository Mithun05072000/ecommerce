import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch('http://localhost:5000/buyer/cart', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productId: number) => {
    await fetch(`http://localhost:5000/buyer/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setCartItems(cartItems.filter((item: any) => item.id !== productId));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item: any) => (
          <div key={item.id} className="border p-4 mb-4 rounded">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>${item.price}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
            >
              Remove from Cart
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
