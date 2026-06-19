const Quote = require("../models/Quote");

// Create Quote
const createQuote = async (req, res) => {
  try {
    const { productId, name, email, quantity } = req.body;

    const quote = new Quote({
      productId,
      name,
      email,
      quantity,
    });

    await quote.save();

    res.status(201).json({
      success: true,
      message: "Quote saved successfully",
      quote,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error saving quote",
    });
  }
};

// Get All Quotes
const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quotes.length,
      quotes,
    });
  } catch (error) {
    console.error("GET ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Quote
const deleteQuote = async (req, res) => {
  try {
    console.log("Deleting quote:", req.params.id);

    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quote deleted",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createQuote,
  getQuotes,
  deleteQuote,
};