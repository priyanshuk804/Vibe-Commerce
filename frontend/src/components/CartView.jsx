import React, { useState } from "react";

export default function CartView({ cart = [], onRemove, onUpdate, onCheckout }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const total = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0);

  return (
    <div className="cart-card">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <div className="empty">Cart is empty</div>
      ) : (
        <div className="cart-list">
          {cart.map((it) => {
            const pid = it._id || it.id;
            return (
              <div key={pid} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{it.name}</div>
                  <div className="cart-item-price">₹{it.price}</div>
                </div>
                <div className="cart-item-controls">
                  <input
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) => onUpdate(pid, Number(e.target.value))}
                    className="qty-input"
                  />
                  <button className="small-btn remove" onClick={() => onRemove(pid)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="cart-total">Total: ₹{total.toFixed(2)}</div>

          <div className="checkout-form">
            <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button className="btn primary" onClick={() => onCheckout(name, email)}>
              Place Order (mock)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
