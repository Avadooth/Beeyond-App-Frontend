import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBrandClick = () => {
    if (user) {
      const confirmLogout = window.confirm("Do you want to logout?");
      if (confirmLogout) {
        handleLogout();
      }
    } else {
      navigate("/"); 
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <button
          onClick={handleBrandClick}
          className="text-xl font-bold tracking-wide focus:outline-none"
        >
          Beeyond<span className="text-purple-500">App</span>
        </button>

        {user && (
          <ul className="flex space-x-6 text-sm sm:text-base font-medium items-center">
            {user.role === "customer" && (
              <>
                <li>
                  <Link
                    to="/ProductCatalog"
                    className="hover:text-purple-400 transition"
                  >
                    Product Catalog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Tracking"
                    className="hover:text-purple-400 transition"
                  >
                    Track Your Product
                  </Link>
                </li>
              </>
            )}  
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
