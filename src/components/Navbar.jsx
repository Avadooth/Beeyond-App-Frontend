import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Customer', to: '/customer' },
    { label: 'Delivery', to: '/delivery' },
    { label: 'Admin', to: '/admin' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gray-900 text-white shadow-md"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-wide">
          Beeyond<span className="text-purple-400">UI</span>
        </div>
        <ul className="flex space-x-6 text-sm sm:text-base font-medium">
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`relative group transition-all duration-300 ${
                  pathname === to ? 'text-purple-400' : 'text-white hover:text-purple-400'
                }`}
              >
                {label}
                <span className="block h-0.5 bg-gradient-to-r from-purple-500 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
