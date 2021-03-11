const mysql = require('mysql');
const {promisify} = require('util');
const log4js = require('log4js');

let logger = log4js.getLogger('index.js');
logger.level = 'all';

const {database} = require('./config');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          logger.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            logger.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            logger.error('Database connection was refused');
        }
    }

    if (connection) connection.release();
    logger.info('DB is Connected');

    return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
