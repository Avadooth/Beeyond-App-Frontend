import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import OrderCard from '../components/OrderCard';
import { io } from 'socket.io-client';

const socket = io('/', {
  path: '/socket.io',
  transports: ['websocket'],
});

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then(res => {
      setOrders(res.data);
      res.data.forEach(order =>
        socket.emit('joinOrderRoom', { orderId: order._id })
      );
    });

    socket.on('orderStatusUpdate', data => {
      setOrders(prev =>
        prev.map(o => (o._id === data.orderId ? { ...o, status: data.status } : o))
      );
    });

    return () => socket.disconnect();
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
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide mb-10 text-center bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">
          Your Active Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">
            You have no orders yet.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map(order => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <OrderCard order={order} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
