import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import socket from "../socket.js";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    // Fake product data — replace this with API call later
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("http://localhost:5000/api/products");
      setProducts(response.data);
      console.log("Products fetched:", response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      alert("❌ Failed to load products");
    }
  };

  const handleBuy = async (product) => {
    debugger;
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/orders/BuyOrder",
        {
          productId: product._id,
          productName: product.title,
          productPrice: product.price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`✅ Order placed for: ${product.title}`);
    } catch (err) {
      console.error("Order failed:", err);
      alert("❌ Failed to place order");
    }
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-wide text-center mb-10 bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text">
          Available Products
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onBuy={handleBuy} />
          ))}
        </div>
      </div>
    </section>
  );
}
