import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <a className="hover:text-gray-400">E-commerce</a>
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/">
            <a className="hover:text-gray-400">Home</a>
          </Link>
          <Link href="/signup">
            <a className="hover:text-gray-400">Sign Up</a>
          </Link>
          <Link href="/login">
            <a className="hover:text-gray-400">Login</a>
          </Link>
          <Link href="/buyer/products">
            <a className="hover:text-gray-400">Products</a>
          </Link>
          <Link href="/buyer/cart">
            <a className="hover:text-gray-400">Cart</a>
          </Link>
          <Link href="/seller/dashboard">
            <a className="hover:text-gray-400">Seller Dashboard</a>
          </Link>
          <Link href="/seller/add-product">
            <a className="hover:text-gray-400">Add Product</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
