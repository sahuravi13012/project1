const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const path = require("path")

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
const { userRoutes } = require("./routes/userRotes");
app.use("/api", userRoutes);
app.listen(port, () => {
  console.log(`Your Server Run Port No: http://localhost:${port}`);
});
