import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import OrderCard from "../components/OrderCard";
import socket from "../socket.js"; 

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/orders/allProducts");
      setOrders(res.data);
      res.data.forEach((order) =>
        socket.emit("joinOrderRoom", { orderId: order._id })
      );
    };

    fetchOrders();

    const handleUpdate = ({ orderId, status }) => {


      setOrders((prev) =>
        prev.map((o) =>
          o._id.toString() === orderId.toString() ? { ...o, status } : o
        )
      );
    };

    socket.on("orderStatusUpdate", handleUpdate);

    return () => {
      socket.off("orderStatusUpdate", handleUpdate);
    };
  }, []);

  const activeOrders = orders.filter((order) => order.status !== "delivered");

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

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
          Your Orders
        </h2>

        {/* 🔄 Active Orders */}
        <div className="mb-14">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4">
            🔄 Active Orders
          </h3>
          {activeOrders.length === 0 ? (
            <p className="text-gray-400 text-center">
              You have no active orders.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {activeOrders.map((order) => (
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
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-green-400 mb-4">
            ✅ Delivered Orders
          </h3>
          {deliveredOrders.length === 0 ? (
            <p className="text-gray-400 text-center">
              No orders delivered yet.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {deliveredOrders.map((order) => (
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
        </div>
      </motion.div>
    </section>
  );
}
