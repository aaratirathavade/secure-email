require("dotenv").config();
const express = require("express");

const app = express();

const STORE_EMAIL = process.env.STORE_EMAIL || "default@store.com";
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

app.get("/", (req, res) => {
  const email = req.query.email === "null" ? STORE_EMAIL : req.query.email;
  res.json({ email, token: SHOPIFY_ACCESS_TOKEN ? "Token Loaded" : "No Token" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
