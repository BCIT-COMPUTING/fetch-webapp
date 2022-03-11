
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

  const conn = createConn();
  conn.beginTransaction(async (err) => {
    if (err) { throw err; }

    try {
      let username = req.body.username;
      let password = req.body.password;
      console.log(username);
      console.log(password);
      const { results, fields } = await query(
        `SELECT * FROM userProfile WHERE username = "${username}" AND password = "${password}"
        `, { connection: conn, }
      );
      // if (error) throw error;
      console.log(results);
      if (results.length > 0) {
				// Authenticate the user
				// request.session.loggedin = true;
				// request.session.username = username;
				// Redirect to home page
        // res.redirect('/signin');
        console.log('signed in: ' + username);
        res.send("Successfully signed in: " + username);
        conn.end();
			} else {
        res.send('Incorrect Username and/or Password!');
        conn.end();
			}	
    

      // console.log(results, fields);

      // conn.commit(function (err) {
      //   if (err) throw err;
      //   console.log("Successfully logged in: " + req.body.username);
      //   conn.end();
      // });

      // res.send("Successfully logged in: " + req.body.username);

    } catch (err) {
      res.send("Failed to log in: " + req.body.username);
      console.error(err);
      conn.rollback();
    }
  });
});

server.post("/signup", function (req, res) {
  console.log("signup hit");

  const conn = createConn();
  conn.beginTransaction(async (err) => {
    if (err) { throw err; }

    try {
      const { userResults, userFields } = await query(
        `INSERT INTO UserProfile(firstname, lastname, username, email, password)
        VALUES("${req.body.firstName}", "${req.body.lastName}", "${req.body.username}", "${req.body.email}", "${req.body.password}");
        `, { connection: conn, }
      );

      const { dogResults, dogFields } = await query(
        `INSERT INTO dogProfile(name, age, gender, url)
        VALUES("${req.body.dogName}", "${req.body.dogAge}", "${req.body.dogGender}", "${req.body.dogUrl}");
        `, { connection: conn, }
      );

      console.log(userResults, userFields);
      console.log(dogResults, dogFields);

      conn.commit(function (err) {
        if (err) throw err;
        console.log("Successfully registered: " + req.body.firstName + " + " + req.body.dogName);
        conn.end();
      });

      res.send("Successfully registered: " + req.body.firstName + " + " + req.body.dogName);

    } catch (err) {
      res.send("Failed to register: " + req.body.firstName + " + " + req.body.dogName);
      console.error(err);
      conn.rollback();
    }
  });
});

server.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));