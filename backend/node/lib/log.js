const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'log/my.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger();
module.exports = logger;
