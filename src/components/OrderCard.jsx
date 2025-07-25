import { motion } from "framer-motion";

export default function OrderCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 text-white w-full max-w-md mx-auto"
    >
      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">
        Order #{order.productId.slice(-6).toUpperCase()}
      </h3>
      <p className="text-lg text-gray-300">
        <span className="font-semibold text-white"> productName:</span>
        {order.productName}
      </p>

      <p className="text-lg text-gray-300">
        <span className="font-semibold text-white">Status:</span> {order.status}
      </p>


    </motion.div>
  );
}
