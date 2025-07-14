import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data));
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide mb-10 text-center">
          Admin Panel
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => (
            <motion.article
              key={order._id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-bold mb-2 text-gradient bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
                Order: {order._id}
              </h3>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Status:</span> {order.status}
              </p>
              <p className="text-gray-300 mt-1">
                <span className="font-semibold text-white">Customer:</span> {order.customerId?.name || 'N/A'}
              </p>
              <p className="text-gray-300 mt-1">
                <span className="font-semibold text-white">Partner:</span> {order.partnerId?.name || 'Unassigned'}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
