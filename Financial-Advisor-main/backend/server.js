require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/User");
const newsRoutes = require("./routes/News");

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes

app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// MongoDB connection
const connectToDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect("mongodb://localhost:27017/testdb");
    console.log("[+] Connected to MongoDB");
  } catch (err) {
    console.log("[-] Error connecting to MongoDB", err);
  }
};

connectToDB();

// Default 404 route for unmatched paths
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`[+] Server running on port ${PORT}`));
