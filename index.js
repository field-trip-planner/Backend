require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
// const cors = require('cors')
// const helmet = require('helmet')

const server = express();

server.get("/", (req, res) => {
  res.status(200).json("Server is up");
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server is up on http://localhost:${PORT}`);
  });
}
