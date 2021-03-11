/**
 * Reading Environment Variables
 */
const dotenv = require('dotenv');
const log4js = require('log4js');
let logger = log4js.getLogger('index.js');
logger.level = 'all';
dotenv.config();

/**
 * Importing the Main App
 */
const app = require('./app');

app.listen(app.get('port'));
logger.info(`Server running on port ${app.get('port')} ...`);