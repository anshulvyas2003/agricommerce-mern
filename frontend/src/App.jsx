import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import QuoteForm from "./pages/QuoteForm";
import Checkout from "./pages/Checkout";

import AdminDashboard from "./pages/AdminDashboard";
import AdminQuotes from "./pages/AdminQuotes";
import AdminOrders from "./pages/AdminOrders";

function App() {
  const [mode, setMode] = useState("B2C");

  return (
    <BrowserRouter>
      <Navbar mode={mode} setMode={setMode} />

      <Routes>
        <Route
          path="/"
          element={<Home mode={mode} />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails mode={mode} />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/quote/:id"
          element={<QuoteForm />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/quotes"
          element={<AdminQuotes />}
        />

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;