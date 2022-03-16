const mysql = require('mysql');
const { mysqlConfig } = require('./mysqlConfig');
const credentials = require('./credentials');
const fs = require("fs");
const path = require('path');


const databaseName = "fetchWebapp";
const isDevEnv = process.env.NODE_ENV === "development";
const certFilePath = path.resolve(__dirname, `DigiCertGlobalRootCA.crt.pem`);

const createConn = (database = databaseName) => {
  const certificateFile = fs.readFileSync(certFilePath, "utf8");

  // const hostConfig = mysql.createConnection({
  //   host: "comp4537.mysql.database.azure.com",
  //   port: mysqlConfig.PORT,
  //   user: "myadmin",
  //   password: "fetch1234.",
  //   database: database,
  //   connectTimeout: 20000,
  //   ssl: isDevEnv ? {} : {
  //     ca: certificateFile
  //   },
  // });
  // console.log("Connection created with config:", hostConfig.config);
  // return hostConfig;

  const conn = mysql.createConnection({
    host: mysqlConfig.HOST,
    port: mysqlConfig.PORT,
    user: credentials.user,
    password: credentials.password,
    database: database,
    connectTimeout: 20000,
    ssl: isDevEnv ? {} : {
      ca: certificateFile
    },
  });
  // console.log("Connection created with config:", conn.config);
  return conn;
}

/**
* @param {string} queryStr
* @param {{
* connection: mysql.Connection?,
* values: any
* }} options
* @returns {{
*  results: any,
*  fields: mysql.FieldInfo[],
*  conn: mysql.Connection,
* }}
*/
const query = (queryStr, options) => {
  const values = options?.values;
  const connection = options?.connection ?? createConn();

  const prom = new Promise((resolve, reject) => {
    connection.query(queryStr, values, (err, results, fields) => {
      if (err) reject(err);
      resolve({ results, fields, conn: connection });
    })
  })
  return prom;
}


const ensureTables = () => {
  const conn = createConn();
  conn.beginTransaction(async (err) => {
    try {
      if (err) throw err;


      const { userResults, userFields } = await query(
        `CREATE TABLE IF NOT EXISTS userProfile (
                  id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
                  firstname varchar(30) not null,
                  lastname varchar(30) not null,
                  username varchar(30) not null,
                  email varchar(50) not null,
                  password varchar(128) not null,
                  UNIQUE KEY username ( username )
              );`, { connection: conn, }
      );
      const { dogResults, dogFields } = await query(
        `CREATE TABLE IF NOT EXISTS dogProfile (
                id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
                usernameOwner varchar(30) not null,
                name varchar(30) not null,
                age INT( 11 ) not null,
                gender varchar(6) not null,
                url varchar(255) not null,
                CONSTRAINT FK_usernameDog FOREIGN KEY (usernameOwner) REFERENCES userProfile(username)
              );`, { connection: conn, }
      );

      console.log(userResults, userFields);
      console.log(dogResults, dogFields);
      console.log('userProfile + dogProfile table creation is ensured...');

      // const createTablesResult = query(
      //     'CR INTO log SET data=?',
      //     { values: databaseName, connection: conn, }
      // );

      conn.commit(function (err) {
        if (err) throw err;
        console.log('success!');
        conn.end();
      });

    } catch (err) {

      conn.rollback();
      if (err.code === 'ECONNREFUSED') {
        console.error("\nMysql connection refused, check if your database is running.\n");
      } else {
        console.error(err);
      }
    }
  });
}

module.exports = {
  createConn,
  query,
  ensureTables,
}

