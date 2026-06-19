import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://agricommerce-mern.onrender.com/api/orders"
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://agricommerce-mern.onrender.com/api/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Order deleted successfully");
        fetchOrders();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `https://agricommerce-mern.onrender.com/api/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Status updated");
        fetchOrders();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Status update failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order.email
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Orders</h1>

      <h3>Total Orders: {filteredOrders.length}</h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search customer or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "8px",
            width: "250px",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          style={{
            padding: "8px",
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Update Status</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>

                <td>{order.email}</td>

                <td>₹{order.totalAmount}</td>

                <td>
                  <span
                    style={{
                      color:
                        order.status ===
                        "Approved"
                          ? "green"
                          : order.status ===
                            "Rejected"
                          ? "red"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Approved">
                      Approved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(order._id)
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;