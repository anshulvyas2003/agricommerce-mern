import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function Hero({ mode }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    axios
      .get("https://agricommerce-mern.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All"
        ? true
        : product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: "40px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#2c7a2c",
        }}
      >
        Agricultural Commerce Platform
      </h1>

      <h2
        style={{
          textAlign: "center",
          color: "green",
          marginTop: "15px",
        }}
      >
        Current Mode: {mode}
      </h2>

      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "300px",
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={{
            padding: "10px",
          }}
        >
          <option value="All">All</option>
          <option value="Seeds">Seeds</option>
          <option value="Fertilizer">
            Fertilizer
          </option>
          <option value="Tools">Tools</option>
        </select>
      </div>

      <h3
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Products Found: {filteredProducts.length}
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;