import React, { useCallback, useEffect, useState } from "react";
import Product from "./Product";

const url = "https://dummyjson.com/products";

type Product = {
  id: number;
  description: string;
  images: string[];
};

type AsyncState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

type ApiResponse = {
  products: Product[];
};
function ImageSlider() {
  const [state, setState] = useState<AsyncState<Product[]>>({
    status: "loading",
  });

  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ApiResponse>;
      })
      .then((val) => {
        if (!cancelled) {
          setState({ status: "success", data: val.products });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            error: err instanceof Error ? err.message : "Something went wrong",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") return <p>Loading...</p>;
  if (state.status === "error") return <p>Error: {state.error}</p>;

  const products = state.data;

  const handleNextClick = useCallback(() => {
    setActiveIndex((index) => Math.min(index + 1, products.length - 1));
    setDirection("next");
  }, [products.length]);

  const handlePrevClick = useCallback(() => {
    setActiveIndex((index) => Math.max(0, index - 1));
    setDirection("prev");
  }, []);

  return (
    <div className="container">
      <button
        className="btn"
        onClick={() => handlePrevClick()}
        disabled={activeIndex === 0}
      >
        Previous
      </button>
      {products.map((product, index) => (
        <Product product={product} index={index} activeIndex={activeIndex}  direction ={direction}/>
      ))}
      <button
        className="btn"
        onClick={() => handleNextClick()}
        disabled={activeIndex === products.length - 1}
      >
        Next
      </button>
    </div>
  );
}

export default ImageSlider;
