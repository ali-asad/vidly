const express = require ('express');
const error = require ('../middleware/error');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const auth = require ('../routes/auth');
const users = require ('../routes/users');


module.exports = function (app){
    app.use(express.json()); //json middleware, parses body of req, if there is a json obj it will populate req.body
    app.use('/api/genres' , genres);
    app.use('/api/customers' , customers);
    app.use('/api/movies' , movies);
    app.use('/api/rentals' , rentals);
    app.use('/api/auth' , auth);
    app.use('/api/users' , users);
    //error middleware function should be called after all other  middleware functions
    app.use(error);
}