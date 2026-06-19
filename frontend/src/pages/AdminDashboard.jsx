import { useEffect, useState } from "react";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("https://agricommerce-mern.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        }
      });

    fetch("https://agricommerce-mern.onrender.com/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQuotes(data.quotes);
        }
      });
  }, []);

  const revenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        padding: "30px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          color: "#2c3e50",
        }}
      >
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#3498db",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Orders</h3>
          <h1>{orders.length}</h1>
        </div>

        <div
          style={{
            background: "#2ecc71",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Quotes</h3>
          <h1>{quotes.length}</h1>
        </div>

        <div
          style={{
            background: "#f39c12",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Pending Orders</h3>
          <h1>{pendingOrders}</h1>
        </div>

        <div
          style={{
            background: "#9b59b6",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Revenue</h3>
          <h1>₹{revenue}</h1>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Recent Orders</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#ecf0f1",
              }}
            >
              <th style={{ padding: "12px" }}>
                Customer
              </th>
              <th style={{ padding: "12px" }}>
                Email
              </th>
              <th style={{ padding: "12px" }}>
                Total
              </th>
              <th style={{ padding: "12px" }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order._id}>
                <td style={{ padding: "12px" }}>
                  {order.customerName}
                </td>

                <td style={{ padding: "12px" }}>
                  {order.email}
                </td>

                <td style={{ padding: "12px" }}>
                  ₹{order.totalAmount}
                </td>

                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      background:
                        order.status === "Approved"
                          ? "#2ecc71"
                          : order.status === "Rejected"
                          ? "#e74c3c"
                          : "#f39c12",
                      color: "white",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;