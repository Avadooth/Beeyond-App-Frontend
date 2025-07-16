import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import socket from "../socket"; // shared socket instance

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const incomingOrdersRef = useRef([]); // store incoming new orders
  const orderIdsRef = useRef(new Set());

  useEffect(() => {
    let isMounted = true;

    api.get("/orders/partnerOrders").then((res) => {
      if (isMounted) {
        setOrders(res.data);

        res.data.forEach((order) => {
          orderIdsRef.current.add(order._id.toString());
          socket.emit("joinOrderRoom", { orderId: order._id });
        });
      }
    });

    socket.on("orderStatusUpdate", ({ orderId, status }) => {
      setOrders((prev) =>
        prev.map((order) =>
          order._id.toString() === orderId.toString()
            ? { ...order, status }
            : order
        )
      );
    });

    socket.on("newOrder", (order) => {
      console.log("📬 Received newOrder:", order);

      setOrders((prevOrders) => {
        const alreadyExists = prevOrders.some(
          (o) => o._id.toString() === order._id.toString()
        );

        if (alreadyExists) {
          console.log("⚠️ Duplicate order skipped:", order._id);
          return prevOrders;
        }

        // Mark as known to prevent future duplicates
        orderIdsRef.current.add(order._id.toString());

        const updatedOrders = [...prevOrders, order].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return updatedOrders;
      });
    });

    return () => {
      isMounted = false;
      socket.off("orderStatusUpdate");
      socket.off("newOrder");
    };
  }, []);

  const handleAccept = async (orderId) => {
    debugger;
    try {
      const res = await api.post(`/orders/${orderId}/accept`);
      const updatedOrder = res.data;

      // Update the order in the state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: updatedOrder.status }
            : order
        )
      );
      console.log("✅ Updated Order Received:", updatedOrder);

      socket.emit("joinOrderRoom", { orderId }); // optional: join after accepting
      alert("Order accepted");
    } catch (err) {
      alert("Order already taken");
    }
  };

  const handleStatusChange = (orderId, status) => {
    console.log("Updating order status:", orderId, status);
    socket.emit("updateOrderStatus", { orderId, status });
  };

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const acceptedOrders = orders.filter((order) => order.status !== "pending");

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

        {/* Unaccepted Orders */}
        <div className="mb-14">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4">
            🟡 Unaccepted Orders
          </h3>
          {pendingOrders.length === 0 ? (
            <p className="text-gray-400">No unaccepted orders available.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pendingOrders.map((order) => (
                <motion.article
                  key={order._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">
                    Order #{order.productId.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-white">Product:</span>{" "}
                    {order.productName}
                  </p>
                  <p className="text-gray-300 mb-4">
                    <span className="font-semibold text-white">Status:</span>{" "}
                    {order.status}
                  </p>
                  <button
                    onClick={() => handleAccept(order._id)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-md font-semibold transition-all duration-300"
                  >
                    Accept Order
                  </button>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* Accepted Orders */}
        <div>
          <h3 className="text-2xl font-semibold text-green-400 mb-4">
            🟢 Your Accepted Orders
          </h3>
          {acceptedOrders.length === 0 ? (
            <p className="text-gray-400">No accepted orders yet.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {acceptedOrders.map((order) => (
                <motion.article
                  key={order._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Order #{order.productId.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-white">Product:</span>{" "}
                    {order.productName}
                  </p>
                  <p className="text-gray-300 mb-4">
                    <span className="font-semibold text-white">Status:</span>{" "}
                    {order.status}
                  </p>
                  <div className="flex flex-col space-y-2">
                    {order.status === "accepted" && (
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "picked-up")
                        }
                        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition-all duration-300"
                      >
                        Picked Up
                      </button>
                    )}

                    {order.status === "picked-up" && (
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "on-the-way")
                        }
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-all duration-300"
                      >
                        On The Way
                      </button>
                    )}

                    {order.status === "on-the-way" && (
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "delivered")
                        }
                        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md font-semibold transition-all duration-300"
                      >
                        Delivered
                      </button>
                    )}

                    {order.status === "delivered" && (
                      <span className="inline-block mt-2 px-3 py-1 bg-green-700 text-sm text-white rounded-full">
                        ✅ Delivered
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
