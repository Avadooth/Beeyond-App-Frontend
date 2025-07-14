import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/customer");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-16 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700"
      >
        <h2 className="text-4xl font-extrabold tracking-wide text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text">
          Login
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold rounded-md transition-all duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
