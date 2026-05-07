import React from "react";

export default function Product({ product, activeIndex, index, direction }) {
  return (
    <div>
      {index === activeIndex && (
        <img
          src={product.images[0]}
          alt={product.description}
          key={product.id}
          className={direction === "next" ? "slider-next" : "slider-prev"}
        />
      )}
    </div>
  );
}
