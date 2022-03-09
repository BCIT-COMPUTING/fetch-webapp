const dotenv = require('dotenv');
const path = require('path');
const mysql = require('mysql');
const credentials = require('./credentials');

const databaseName = "fetchWebapp";

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

const mysqlConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.MYSQL_PORT || 3306,
};

const createConn = (database = databaseName) => {
    return mysql.createConnection({
        host: mysqlConfig.HOST,
        port: mysqlConfig.PORT,
        user: credentials.user,
        password: credentials.password,
        database: database
    });
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
const query = (queryStr, { values, connection = createConn() }) => {

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
        if (err) { throw err; }

        try {
            const { results, fields } = await query(
                `CREATE TABLE IF NOT EXISTS userProfile (
                    id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
                    username varchar(30),
                    email varchar(50),
                    password varchar(128),
                    UNIQUE KEY username ( username )
                )`, { connection: conn, }
            );

            console.log(results, fields);
            console.log('Table userProfile table creation is ensured...');

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
            console.error(err);
            conn.rollback();
        }
    });
}

module.exports = {
    createConn,
    query,
    ensureTables,
}

