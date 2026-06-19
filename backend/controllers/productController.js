const products = [
  {
    id: 1,
    name: "Premium Wheat Seeds",
    category: "Seeds",
    price: 500,
  },
  {
    id: 2,
    name: "Rice Seeds",
    category: "Seeds",
    price: 700,
  },
  {
    id: 3,
    name: "Organic Fertilizer",
    category: "Fertilizer",
    price: 1200,
  },
  {
    id: 4,
    name: "Farming Tools",
    category: "Tools",
    price: 2500,
  },
];

const getProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const product = products.find(
    (p) => p.id === parseInt(req.params.id)
  );

  res.json(product);
};

module.exports = {
  getProducts,
  getProductById,
};