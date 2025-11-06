import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], onAdd }) {
  return (
    <div className="grid">
      {products.length === 0 ? (
        <div className="empty">No products available</div>
      ) : (
        products.map((p) => (
          <ProductCard
            key={p._id || p.id}
            product={p}
            onAdd={() => onAdd(p)}
          />
        ))
      )}
    </div>
  );
}
