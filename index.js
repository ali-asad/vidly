const express = require ('express');
const app = express();
const winston = require ('winston');


require('./startup/logging')();
require('./startup/config')();
require ('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.port || 3000;
app.listen(port , ( ) => winston.info(`Listening of port ${port}....`));