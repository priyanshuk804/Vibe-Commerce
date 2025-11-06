import React from "react";

export default function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="brand">
          <span className="brand-emoji">🛍️</span>
          <span className="brand-text">Vibe<span>Commerce</span></span>
        </div>
      </div>

      <div className="nav-center">
        <input
          className="search-input"
          placeholder="Search products, e.g. sneakers"
          aria-label="Search products"
        />
      </div>

      <div className="nav-right">
        <button className="link-btn">Login</button>
        <div className="cart-icon" title="Cart">
          <span>🛒</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
}
