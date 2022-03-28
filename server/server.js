const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./public/swagger.json");
const server = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth");
const dogRoute = require("./routes/dog");
const adminRoute = require("./routes/admin");

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
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(bodyParser.raw({ limit: '50mb' }));

// Routes
server.use("/api/v1/auth", authRoute);
server.use("/dog", dogRoute);
server.use("/api/v1/admin", adminRoute);

// ensureTables();

// server.get("/api/v1/admin/", function (req, res) {
//   console.log("stats in server hit");
//   res.status(200).send('stats in server hit');
// });

server.listen(PORT, () => {
  console.log("Backend server is runnign");
  console.log(`Listening at: http://localhost:${PORT}`);
});
