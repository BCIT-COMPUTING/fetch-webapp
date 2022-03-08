
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const mysqlConfig = require("./configs/mysqlConfig");
const credentials = require("./credentials");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const server = express();
const PORT = process.env.PORT || 8080;

const conn = mysql.createConnection({
  host: mysqlConfig.HOST,
  port: mysqlConfig.PORT,
  user: credentials.user,
  password: credentials.password,

});


server.use(cors());
server.use(bodyParser.json());


server.get('/', function (req, res) {
  conn.query('SHOW TABLES FROM mysql', (err, results) => {
    if (err?.fatal) {
      console.error(err);
      res.send("There was some errors.");
      return;
    }
    res.send("Hello world!" + JSON.stringify(results));
  });
});

server.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
//   })
//   .catch(console.error("Client couldn't connect."));