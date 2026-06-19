const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

// Create Order
router.post("/", createOrder);

// Get Orders
router.get("/", getOrders);

// Update Status
router.put("/:id", updateOrderStatus);

// Delete Order
router.delete("/:id", deleteOrder);

module.exports = router;