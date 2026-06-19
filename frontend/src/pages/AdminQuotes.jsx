import { useEffect, useState } from "react";

function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = () => {
    fetch("http://localhost:5000/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data.quotes));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quote?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/quotes/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Quote deleted successfully");
        fetchQuotes();
      } else {
        alert("Failed to delete quote");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting quote");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quote Requests</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {quotes.map((quote) => (
            <tr key={quote._id}>
              <td>{quote.name}</td>
              <td>{quote.email}</td>
              <td>{quote.productId}</td>
              <td>{quote.quantity}</td>
              <td>
                {new Date(quote.createdAt).toLocaleString()}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(quote._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminQuotes;