import React from "react";

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Order Receipt</h3>
        <p><strong>Receipt ID:</strong> {receipt.id}</p>
        <p><strong>Name:</strong> {receipt.name}</p>
        <p><strong>Email:</strong> {receipt.email}</p>
        <p><strong>Total:</strong> ₹{receipt.total.toFixed(2)}</p>
        <p><strong>Time:</strong> {new Date(receipt.timestamp || receipt.time || receipt.time).toLocaleString()}</p>
        <div className="receipt-items">
          {receipt.items && receipt.items.map((it, i) => (
            <div key={i} className="receipt-row">
              <span>{it.name}</span>
              <span>₹{(it.price * it.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
