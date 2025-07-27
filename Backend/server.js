const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/db");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());// middleware
app.use(express.json());

connectDB();

app.use("/api/tasks", taskRoutes);// routes

app.use((err, req, res, next) => {// error handling middleware
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
