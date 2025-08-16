require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow Shopify frontend to make requests + handle preflight
app.use(cors({
  origin: "https://its-morpankh.myshopify.com",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Explicitly handle OPTIONS preflight requests
app.options("*", cors());

// ✅ Root route (so Render shows something on "/")
app.get("/", (req, res) => {
  res.send("🚀 Secure Email App is running!");
});

// ✅ GET endpoint to fetch store email
app.get("/store-email", async (req, res) => {
  try {
    console.log("SHOPIFY_STORE:", process.env.SHOPIFY_STORE);
    console.log("SHOPIFY_ACCESS_TOKEN:", process.env.SHOPIFY_ACCESS_TOKEN ? "Loaded" : "Missing");

    const response = await axios.get(
      `https://${process.env.SHOPIFY_STORE}/admin/api/2025-07/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Shopify Response:", response.data);

    const storeEmail = response.data.shop.email;
    res.json({ email: storeEmail });
  } catch (error) {
    console.error("Shopify API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data?.errors || error.message
    });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
