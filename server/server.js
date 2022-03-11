
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { query, ensureTables, createConn } = require("./connectionUtils");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const server = express();
const PORT = process.env.PORT || 8080;


server.use(cors());
server.use(bodyParser.json());

ensureTables();


server.get('/', function (req, res) {
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

server.post("/login", function (req, res) {
  console.log("login hit");
  console.log(req.body);
  res.send("hi from the server (login)");
});

server.post("/signup", function (req, res) {
  console.log("signup hit");
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.email);
  console.log(req.body.password);
  res.send("hi from the server (signup)");

  const conn = createConn();
  conn.beginTransaction(async (err) => {
    if (err) { throw err; }

    try {
        const { results, fields } = await query(
            `INSERT INTO UserProfile(username, email, password)
            VALUES("${req.body.username}", "${req.body.email}", "${req.body.password}");
            `, { connection: conn, }
        );

        console.log(results, fields);
        console.log('Table userProfile table creation is ensured...');

        // const createTablesResult = query(
        //     'CR INTO log SET data=?',
        //     { values: databaseName, connection: conn, }
        // );

        conn.commit(function (err) {
            if (err) throw err;
            console.log('succdfdsfadfess!');
            conn.end();
        });

    } catch (err) {
        console.error(err);
        conn.rollback();
    }
  });

});

server.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));