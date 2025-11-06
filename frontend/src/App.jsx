import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import CartView from "./components/CartView";
import ReceiptModal from "./components/ReceiptModal";
import { fetchProducts } from "./api";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // { id/_id, name, price, qty }
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (e) {
        setError(e.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const addToCart = (product) => {
    const pid = product._id || product.id;
    const existing = cart.find((c) => (c._id || c.id) === pid);
    if (existing) {
      setCart((prev) =>
        prev.map((c) =>
          (c._id || c.id) === pid ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } else {
      setCart((prev) => [...prev, { ...(product || {}), qty: 1 }]);
    }
  };

  const updateQty = (pid, qty) => {
    setCart((prev) =>
      prev
        .map((c) => ((c._id || c.id) === pid ? { ...c, qty } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const removeFromCart = (pid) => {
    setCart((prev) => prev.filter((c) => (c._id || c.id) !== pid));
  };

  const handleCheckout = (name, email) => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const time = new Date().toISOString();
    const items = cart.map((i) => ({
      productId: i._id || i.id,
      qty: i.qty,
      name: i.name,
      price: i.price
    }));

    // If backend checkout exists, call it here.
    // For now we create a local mock receipt.
    const mockReceipt = {
      id: Date.now(),
      name: name || "Guest",
      email: email || "",
      total,
      timestamp: time,
      items
    };
    setReceipt(mockReceipt);
    setCart([]);
  };

  return (
    <div className="app-container">
      <Navbar cartCount={cart.reduce((s, i) => s + (i.qty || 0), 0)} />
      <main className="main-content container">
        {error && <div className="error-box">{error}</div>}
        <section className="products-area">
          <h2 className="section-title">Products</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <ProductGrid products={products} onAdd={addToCart} />
          )}
        </section>

        <aside className="cart-area">
          <CartView
            cart={cart}
            onRemove={removeFromCart}
            onUpdate={updateQty}
            onCheckout={handleCheckout}
          />
        </aside>
      </main>

      {receipt && (
        <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
      )}
    </div>
  );
}
