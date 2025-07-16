import { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import socket from '../socket';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const orderIdsRef = useRef(new Set());

  useEffect(() => {

    api.get('/admin/orders').then(res => {
      setOrders(res.data);

      res.data.forEach(order => {
        socket.emit('joinOrderRoom', { orderId: order._id });
      });
    });


    api.get('/admin/partners').then(res => setPartners(res.data));


    socket.on('orderStatusUpdate', ({ orderId, status }) => {
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    });

    socket.on("newOrder", (order) => {


      setOrders((prevOrders) => {
        const alreadyExists = prevOrders.some(
          (o) => o._id.toString() === order._id.toString()
        );

        if (alreadyExists) {
          return prevOrders;
        }

        orderIdsRef.current.add(order._id.toString());

        const updatedOrders = [...prevOrders, order].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return updatedOrders;
      });
    });

    return () => {
      socket.off('orderStatusUpdate');
      socket.off('newOrder');
    };
  }, []);

  return (
    <section className="bg-gray-900 text-white min-h-screen py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">📦 Live Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Partner</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="border-t border-gray-700">
                    <td className="px-4 py-2">{order.productId.slice(-6).toUpperCase()}</td>
                    <td className="px-4 py-2">{order.productName}</td>
                    <td className="px-4 py-2">{order.customerId?.name || 'N/A'}</td>
                    <td className="px-4 py-2">{order.partnerId?.name || 'Unassigned'}</td>
                    <td className="px-4 py-2 capitalize">{order.status}</td>
                    <td className="px-4 py-2">{new Date(order.updatedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-400">🛵 Delivery Partners</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {partners.map(partner => (
                  <tr key={partner._id} className="border-t border-gray-700">
                    <td className="px-4 py-2">{partner.name}</td>
                    <td className="px-4 py-2">{partner.email}</td>
                    <td className="px-4 py-2">{partner.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
