const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const certificateRoutes = require("./routes/certificateRoutes");

const app = express();
const PORT = process.env.PORT || 5130;

// Middleware
app.use(bodyParser.json({ limit: "10mb" }));  // To handle large base64 image data
app.use(cors()); // Enable CORS

// Use certificate routes
app.use("/api", certificateRoutes); // All certificate routes will be under /api

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
