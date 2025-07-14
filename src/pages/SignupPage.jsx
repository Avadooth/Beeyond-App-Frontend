import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      if (form.role === 'customer') navigate('/customer');
      else if (form.role === 'partner') navigate('/delivery');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-4xl font-extrabold tracking-wide text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text">
          Sign Up
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <input name="name" required placeholder="Full Name" onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400" />
          <input name="email" required type="email" placeholder="Email" onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400" />
          <input name="password" required type="password" placeholder="Password" onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400" />

          <select name="role" onChange={handleChange} className="w-full px-4 py-3 rounded-md bg-gray-700 text-white">
            <option value="customer">Customer</option>
            <option value="partner">Delivery Partner</option>
          </select>

          <button type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold rounded-md transition-all duration-300">
            Create Account
          </button>
        </form>
      </motion.div>
    </section>
  );
}
