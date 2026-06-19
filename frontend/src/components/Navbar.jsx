import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar({ mode, setMode }) {
  const { cart } = useContext(CartContext);

  return (
    <nav
      style={{
        background: "#2d6a4f",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        flexWrap: "wrap",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <h2 style={{ margin: 0 }}>
          🌾 AgriCommerce
        </h2>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setMode("B2B")}
          style={{
            background:
              mode === "B2B"
                ? "#f39c12"
                : "white",
            color:
              mode === "B2B"
                ? "white"
                : "#2d6a4f",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Wholesale (B2B)
        </button>

        <button
          onClick={() => setMode("B2C")}
          style={{
            background:
              mode === "B2C"
                ? "#3498db"
                : "white",
            color:
              mode === "B2C"
                ? "white"
                : "#2d6a4f",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Retail (B2C)
        </button>

        <Link
          to="/admin"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/admin/orders"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Orders
        </Link>

        <Link
          to="/admin/quotes"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Quotes
        </Link>

        <Link
          to="/cart"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            background: "#1b4332",
            padding: "8px 14px",
            borderRadius: "8px",
          }}
        >
          🛒 Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;