import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/seller/products', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });

        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/seller/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.ok) {
        setProducts(products.filter(product => product.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
      {/* Container for header and button */}
      <div className="relative w-full max-w-4xl mb-8">
        {/* Centered Heading */}
        <h1 className="text-4xl font-bold text-center mb-8">Manage Products</h1>
        {/* Positioned Button */}
        <Link href="/seller/add-product">
          <button className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
            <FaPlus className="mr-2" /> Add New Product
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Discount</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.discount}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/seller/edit-product?id=${product.id}`}>
                  <button className="text-blue-500 hover:underline mr-4">Edit</button>
                </Link>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
