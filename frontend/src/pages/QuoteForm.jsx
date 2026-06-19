import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function QuoteForm() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/quotes",
        {
          productId: id,
          ...formData,
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Request Quote</h1>

      <p>Product ID: {id}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Submit Quote Request
        </button>
      </form>
    </div>
  );
}

export default QuoteForm;