const express = require("express");
const router = express.Router();

const {
  createQuote,
  getQuotes,
  deleteQuote,
} = require("../controllers/quoteController");

// Create Quote
router.post("/", createQuote);

// Get All Quotes
router.get("/", getQuotes);

// Delete Quote
router.delete("/:id", deleteQuote);

module.exports = router;