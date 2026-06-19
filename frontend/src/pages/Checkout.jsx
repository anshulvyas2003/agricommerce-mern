import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const handleOrder = async () => {
    if (!customerName || !email) {
      alert("Please enter name and email");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName,
            email,
            items: cart,
            totalAmount: total,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Order placed successfully!");

        clearCart();

        setCustomerName("");
        setEmail("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              style={{
                display: "block",
                width: "300px",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={{
                display: "block",
                width: "300px",
                padding: "10px",
              }}
            />
          </div>

          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <button
            onClick={handleOrder}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;