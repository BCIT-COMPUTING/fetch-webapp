const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { query, ensureTables, createConn } = require("./configs/connectionUtils");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const server = express();
const PORT = process.env.PORT || 8080;

server.use(cors());
server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
server.use(bodyParser.json());

ensureTables();

const stats = {
  numOfLoginAttempts: 0,
  numOfSuccessfulLogins: 0,
  numOfFailedLogins: 0,
  numOfUsers: 0,
  numOfTimesVisitedStatPage: 0,
}

server.get("/", function (req, res) {
  // THIS IS FOR TESTING
  try {
    const { results, conn, fields } = query("SHOW TABLES FROM mysql");
    console.log("results", results);
    res.send("Hello world!" + JSON.stringify(results));
    conn.end();
  } catch (err) {
    console.error(err);
    res.send("There was some errors.");
  }
});


server.post("/login", function (req, res) {
  console.log("login hit");

  const conn = createConn();
  conn.beginTransaction(async (err) => {
    if (err) { 
      stats.numOfFailedLogins++;
      throw err;
    }

    try {
      let username = req.body.username;
      let password = req.body.password;

      const { results, fields } = await query(
        `SELECT * FROM userProfile WHERE username = "${username}" AND password = "${password}"
        `, { connection: conn, }
      );

      if (results.length > 0) {
        stats.numOfSuccessfulLogins++;
        res.status(200).send("Successfully signed in: " + username);
        conn.end();
			} else {
        stats.numOfFailedLogins++;
        res.status(403).send('Incorrect Username and/or Password!');
        conn.end();
			}	
    
    } catch (err) {
      stats.numOfFailedLogins++;
      res.status(403).send("Failed to log in: " + username);
      console.error(err);
      conn.rollback();
    } finally {
      stats.numOfLoginAttempts++;
    }
  });
});

server.post("/signup", function (req, res) {
  console.log("signup hit");

  const conn = createConn();
  conn.beginTransaction(async (err) => {
    if (err) { throw err; }

    try {
      let username = req.body.username;

      const { results, fields } = await query(
        `SELECT * FROM userProfile WHERE username = "${username}"
        `, { connection: conn, }
      );

      console.log(results);
      if (results.length == 0) {
        const { userResults, userFields } = await query(
          `INSERT INTO UserProfile(firstname, lastname, username, email, password)
          VALUES("${req.body.firstName}", "${req.body.lastName}", "${req.body.username}", "${req.body.email}", "${req.body.password}");
          `, { connection: conn, }
        );
  
        const { dogResults, dogFields } = await query(
          `INSERT INTO dogProfile(usernameOwner, name, age, gender, url)
          VALUES("${req.body.username}", "${req.body.dogName}", "${req.body.dogAge}", "${req.body.dogGender}", "${req.body.dogUrl}");
          `, { connection: conn, }
        );
  
        console.log(userResults, userFields);
        console.log(dogResults, dogFields);
  
        conn.commit(function (err) {
          if (err) { throw err; }
          res.status(200).send("Successfully registered: " + req.body.firstName + " + " + req.body.dogName);
          conn.end();
        });
  
			} else {
        res.status(409).send('Username already taken!');
        conn.end();
			}	

    } catch (err) {
      res.status(409).send("Failed to register: " + req.body.firstName + " + " + req.body.dogName);
      console.error(err);
      conn.rollback();
    }
  });
});

server.get("/admin", function(req, res) {
  stats.numOfTimesVisitedStatPage++;
  console.log("stats hit");
  res.status(200).send(stats);
})

server.listen(PORT, () =>
  console.log(`Listening at: http://localhost:${PORT}`)
);
