require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow only your Shopify store frontend to make requests
app.use(cors({
  origin: "https://its-morpankh.myshopify.com"
}));

// ✅ GET endpoint to fetch store email
app.get("/store-email", async (req, res) => {
  try {
    const response = await axios.get(
      `https://${process.env.SHOPIFY_STORE}/admin/api/2025-07/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const storeEmail = response.data.shop.email;
    res.json({ email: storeEmail });
  } catch (error) {
    console.error("Shopify API Error:", error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data?.errors || error.message
    });
  }
});

// ✅ Root route (so you don’t see “Cannot GET /”)
app.get("/", (req, res) => {
  res.send("🚀 Secure Email App is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
