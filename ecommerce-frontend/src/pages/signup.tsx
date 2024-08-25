import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', userType: 'buyer' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-6">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-4 border"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border"
          onChange={handleChange}
          required
        />
        <select
          name="userType"
          className="w-full p-2 mb-4 border"
          onChange={handleChange}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
