const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

app.listen(config.PORT, () => {
  logger.info(`App listening at http://localhost:${config.PORT}`);
});
