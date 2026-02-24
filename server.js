const app = require("./src/app");
const PORT = 8000;
// File khoi dong network node.js
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit Server Express");
  });
});
