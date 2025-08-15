require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow only your Shopify store to make requests
app.use(cors({
  origin: "https://its-morpankh.myshopify.com"
}));

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
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch store email" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
