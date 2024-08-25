import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Seller Dashboard</h1>
      <nav className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <ul className="space-y-4">
          <li>
            <Link href="/seller/add-product" className="block bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 transition duration-300">
              Add New Product
            </Link>
          </li>
          <li>
            <Link href="/seller/products" className="block bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition duration-300">
              Manage Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
