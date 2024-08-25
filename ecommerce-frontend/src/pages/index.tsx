import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to E-Commerce App</h1>
      <div className="flex space-x-4">
        <Link href="/signup" passHref>
          <button className="text-blue-500 hover:underline">Sign Up</button>
        </Link>
        <Link href="/login" passHref>
          <button className="text-blue-500 hover:underline">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
