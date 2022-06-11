const app = require("./src/app");
const config = require("./src/config/config");

const port = config.server.port;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});