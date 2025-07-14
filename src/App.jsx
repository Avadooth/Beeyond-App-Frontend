import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import AdminPanel from "./pages/AdminPanel";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <BrowserRouter>
        <header className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg">
          <Navbar />
        </header>

        <main className="container mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route
                path="/customer"
                element={
                  <PrivateRoute allowedRoles={["customer"]}>
                    <CustomerDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/delivery"
                element={
                  <PrivateRoute allowedRoles={["partner"]}>
                    <DeliveryDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />

              <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Routes>
          </motion.div>
        </main>

        <footer className="text-center py-6 border-t border-gray-700 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Beeyond Inspired App
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
