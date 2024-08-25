// frontend/pages/seller/dashboard.tsx

import Link from 'next/link';


const Dashboard = () => {
  return (
    <div>
      <h1>Seller Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link href="/seller/add-product">Add New Product</Link>
          </li>
          <li>
            <Link href="/seller/products">Manage Products</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
