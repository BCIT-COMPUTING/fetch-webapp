
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { query, ensureTables } = require("./connectionUtils");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const server = express();
const PORT = process.env.PORT || 8080;


server.use(cors());
server.use(bodyParser.json());

ensureTables();


server.get('/', function (req, res) {

  // THIS IS FOR TESTING
  try {
    const { results, conn, fields } = query('SHOW TABLES FROM mysql');
    console.log("results", results);
    res.send("Hello world!" + JSON.stringify(results));
    conn.end();
  } catch (err) {
    console.error(err);
    res.send("There was some errors.");
  }

});

server.get('/login', function (req, res) {
  // TODO: implement login endpoint
  // try {
  //   const { results, conn, fields } = query('SHOW TABLES FROM mysql');
  //   console.log("results", results);
  //   res.send("Hello world!" + JSON.stringify(results));
  //   conn.end();
  // } catch (err) {
  //   console.error(err);
  //   res.send("There was some errors.");
  // }
});

server.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));