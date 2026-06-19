import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { CartContext } from "../context/CartContext";

function ProductDetails({ mode }) {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://agricommerce-mern.onrender.com/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!product) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2>Loading Product...</h2>
      </div>
    );
  }

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
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          borderRadius: "15px",
          padding: "30px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "1",
              minWidth: "250px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "120px",
              }}
            >
              🌾
            </div>
          </div>

          <div
            style={{
              flex: "2",
              minWidth: "300px",
            }}
          >
            <h1
              style={{
                color: "#2c3e50",
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                color: "#777",
                fontSize: "18px",
              }}
            >
              Category: {product.category}
            </p>

            <h2
              style={{
                color: "#27ae60",
                marginTop: "20px",
              }}
            >
              ₹{product.price}
            </h2>

            <p
              style={{
                marginTop: "20px",
                lineHeight: "1.7",
              }}
            >
              Premium quality agricultural
              product suitable for modern
              farming practices. Designed to
              improve productivity and deliver
              reliable results.
            </p>

            {mode === "B2C" ? (
              <button
                onClick={() => {
                  addToCart(product);
                  alert(
                    "Product added to cart"
                  );
                }}
                style={{
                  marginTop: "25px",
                  background: "#27ae60",
                  color: "white",
                  border: "none",
                  padding:
                    "12px 25px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Add To Cart
              </button>
            ) : (
              <Link
                to={`/quote/${product.id}`}
              >
                <button
                  style={{
                    marginTop: "25px",
                    background: "#f39c12",
                    color: "white",
                    border: "none",
                    padding:
                      "12px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Request Quote
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;