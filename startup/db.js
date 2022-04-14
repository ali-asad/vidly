const mongoose = require ('mongoose');
const winston = require ('winston');


module.exports = function () {
    mongoose.connect('mongodb://localhost/self')
.then( () => winston.info('Connected to mongodb://localhost/vidly...'))
.catch( err => console.error('Could not connect to MongoDB...'));

}