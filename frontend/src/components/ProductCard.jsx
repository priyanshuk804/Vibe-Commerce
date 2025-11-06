import React from "react";

export default function ProductCard({ product, onAdd }) {
  const id = product._id || product.id;
  const name = product.name || product.title || "Product";
  const price = product.price ?? product.cost ?? 0;
  const img = product.image || product.img || "https://via.placeholder.com/300x200";

  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={img} alt={name} className="card-img" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <div className="card-price">₹{price}</div>
        <div className="card-actions">
          <button className="btn" onClick={onAdd}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
