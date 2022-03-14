const express = require("express");
const bodyParser = require("body-parser");
// const mysql = require("mysql");
// const {
//   query,
//   ensureTables,
//   createConn,
// } = require("./configs/connectionUtils");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./public/swagger.json");
const server = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.log(err);
  });

// server.use(cors());
server.use(express.json());
server.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
server.use("/static", express.static("public"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(bodyParser.raw());

server.use("/api/v1/auth", authRoute);

// ensureTables();

const stats = {
  numOfLoginAttempts: 0,
  numOfSuccessfulLogins: 0,
  numOfFailedLogins: 0,
  numOfUsers: 0,
  numOfTimesVisitedStatPage: 0,
};

server.get("/admin", function (req, res) {
  stats.numOfTimesVisitedStatPage++;
  console.log("stats hit");
  res.status(200).send(stats);
});

server.listen(PORT, () => {
  console.log("Backend server is runnign");
  console.log(`Listening at: http://localhost:${PORT}`);
});
