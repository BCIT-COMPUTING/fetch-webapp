const dotenv = require('dotenv');
const path = require('path');


dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

const mysqlConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.MYSQL_PORT || 3306,
};

module.exports = {
    mysqlConfig,
}
