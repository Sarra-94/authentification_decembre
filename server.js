const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config();
const path = require("path");
const app = express();

connectDB();

// middleware global
app.use(express.json());
// router
app.use("/api/user", require("./router/user"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("server is running")
);
