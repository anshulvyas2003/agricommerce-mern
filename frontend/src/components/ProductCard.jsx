import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product, mode }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  const handleQuote = () => {
    navigate(`/quote/${product.id}`);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "20px",
        width: "280px",
        textAlign: "center",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          fontSize: "60px",
          marginBottom: "10px",
        }}
      >
        🌾
      </div>

      <Link
        to={`/product/${product.id}`}
        style={{
          textDecoration: "none",
          color: "#222",
        }}
      >
        <h3>{product.name}</h3>
      </Link>

      <p
        style={{
          color: "#666",
          fontWeight: "bold",
        }}
      >
        {product.category}
      </p>

      {mode === "B2C" ? (
        <>
          <h2
            style={{
              color: "#2c7a2c",
            }}
          >
            ₹{product.price}
          </h2>

          <button
            onClick={handleCart}
            style={{
              background: "#2c7a2c",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add To Cart
          </button>
        </>
      ) : (
        <>
          <h2
            style={{
              color: "#ff9800",
            }}
          >
            Price On Request
          </h2>

          <button
            onClick={handleQuote}
            style={{
              background: "#ff9800",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Request Quote
          </button>
        </>
      )}
    </div>
  );
}

export default ProductCard;