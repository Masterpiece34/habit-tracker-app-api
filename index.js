import express from "express";
import habitRoutes from "./routes/habitRoutes.js";

const app = express();
// Fallback to port 3000 if there's no environment variable defined
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// A simple sanity check route to ensure the server is up
app.get("/", (req, res) => {
  res.send("Habit Tracker API is running");
});

// Mount our habit router under the /api prefix
app.use("/api", habitRoutes);

// Fire up the server!
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
