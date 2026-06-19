import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            color: "#2c3e50",
            marginBottom: "30px",
          }}
        >
          🛒 Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Your cart is empty</h2>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <div>
                  <h3>{item.name}</h3>

                  <p
                    style={{
                      color: "#666",
                    }}
                  >
                    ₹{item.price}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(index)
                  }
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                marginTop: "25px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  color: "#27ae60",
                }}
              >
                Total: ₹{total}
              </h2>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  onClick={clearCart}
                  style={{
                    background: "#34495e",
                    color: "white",
                    border: "none",
                    padding:
                      "12px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Clear Cart
                </button>

                <button
                  onClick={() =>
                    navigate("/checkout")
                  }
                  style={{
                    background: "#27ae60",
                    color: "white",
                    border: "none",
                    padding:
                      "12px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;