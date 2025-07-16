// components/Modal.js
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, message, duration = 3000 }) {
    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [isOpen, onClose, duration]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-gray-800 border border-purple-700 text-white rounded-lg shadow-xl p-6 w-full max-w-md"
            >
                <h3 className="text-2xl font-bold mb-3 text-gradient bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {title}
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">{message}</p>

                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-md transition-all duration-300"
                    >
                        OK
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
