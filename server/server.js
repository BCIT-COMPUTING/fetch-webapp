
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const server = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const ENV = process.env.NODE_ENV;
const dotEnvPath = `${__dirname}/configs/${ENV}.env`;
dotenv.config({ path: dotEnvPath });

console.log('HOST URL:', process.env.HOST_URL);

const router = require("./routes/router");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.log(err);
  });
const postConfig = {
  parameterLimit: 10000000,
  limit: 10000000,
};

const postConfigExtended = {
  ...postConfig,
  extended: true,
};

// server.use(cors());
const autoGenSwaggerDocument = require("./public/swagger_output.json");
server.use("/documentation", swaggerUI.serve, swaggerUI.setup(autoGenSwaggerDocument));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.HOST_URL);
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
server.use("/static", express.static("public"));
server.use(
  bodyParser.json({
    parameterLimit: 100000,
    limit: "50mb",
  })
);
server.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: "50mb",
    extended: true,
  })
);
server.use(bodyParser.raw({ limit: "50mb" }));

// Routes
server.use("/api/v1", router);

// ensureTables();

server.listen(PORT, () => {
  console.log("Backend server is runnign");
  console.log(`Listening at: http://localhost:${PORT}`);
});
