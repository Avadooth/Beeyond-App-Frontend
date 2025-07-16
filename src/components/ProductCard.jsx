import { motion } from 'framer-motion';

export default function ProductCard({ product, onBuy }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700"
    >
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold text-white mb-1">{product.title}</h3>
      <p className="text-gray-400 text-sm mb-2">{product.description}</p>
      <p className="text-lg font-semibold text-purple-400 mb-4">₹{product.price}</p>
      <button
        onClick={() => onBuy(product)}
        className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-md transition-all duration-300"
      >
        Buy Now
      </button>
    </motion.div>
  );
}
