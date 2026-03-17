import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AutocompleteResults from "./AutocompleteResults";
import { useCallback } from "react";

const Autocomplete = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef(null);
  //for keyboard navigation
  const [activeIndex, setActiveIndex] = useState(-1);

  //api request to fetch data based on search query

  async function getData(value) {
    try {
      setLoading(true);
      setError(null);

      if(controllerRef.current){
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();
      const data = await fetch(
        `https://dummyjson.com/products/search?q=${value}`,
        {signal:controllerRef.current.signal}
      );
      if (!data.ok) {
        throw new Error("Failed to fetch products");
      }
      const response = await data.json();
      setResults(response.products);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }
  //get data not on every keystroke, but after every 500ms
  useEffect(() => {
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      getData(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  let containerRef = useRef(null);
  //close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (!containerRef.current?.contains(e.target)) {
        setResults([]);
      }
    }
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  //handle keyboard events
  const handleKeyDown = useCallback((e) => {
    console.log("e", e);
    if (e.key === "ArrowDown") {
      setActiveIndex((index) => (index < results.length - 1 ? index + 1 : 0));
    }
    if (e.key === "ArrowUp") {
      setActiveIndex((index) => (index > 0 ? index - 1 : 0));
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      setValue(results[activeIndex].title);
      setResults([]);
    }
  },[results, activeIndex]);

  return (
    <div className="autocomplete_container" ref={containerRef}>
      <h1>Autocomplete UI</h1>
      <div className="autocomplete_container__fields">
        <input
          type="text"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <AutocompleteResults results={results} value={value} />
    </div>
  );
};
export default Autocomplete;
