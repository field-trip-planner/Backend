const PORT = process.env.PORT || 5000;
const server = require("./server");

server.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
