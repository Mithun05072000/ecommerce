import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to E-Commerce App</h1>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
        <Link href="/signup" passHref>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
            Sign Up
          </button>
        </Link>
        <Link href="/login" passHref>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
