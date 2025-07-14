import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data));
  }, []);

  const handleAccept = async (orderId) => {
    try {
      await api.post(`/orders/${orderId}/accept`);
      alert('Order accepted');
    } catch (err) {
      alert('Order already taken');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    await api.patch(`/orders/${orderId}/status`, { status });
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide mb-10 text-center bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">
          Delivery Dashboard
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No orders assigned yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map(order => (
              <motion.article
                key={order._id}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-2 text-gradient bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h3>

                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-white">Items:</span> {order.items.join(', ')}
                </p>

                <p className="text-gray-300 mb-4">
                  <span className="font-semibold text-white">Status:</span> {order.status}
                </p>

                {order.status === 'pending' && (
                  <button
                    onClick={() => handleAccept(order._id)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-md font-semibold transition-all duration-300"
                  >
                    Accept Order
                  </button>
                )}

                {order.status === 'accepted' && (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleStatusChange(order._id, 'picked-up')}
                      className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition-all duration-300"
                    >
                      Picked Up
                    </button>
                    <button
                      onClick={() => handleStatusChange(order._id, 'on-the-way')}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-all duration-300"
                    >
                      On The Way
                    </button>
                    <button
                      onClick={() => handleStatusChange(order._id, 'delivered')}
                      className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md font-semibold transition-all duration-300"
                    >
                      Delivered
                    </button>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
