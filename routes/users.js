const _ = require ('lodash');
const bcrypt = require ('bcrypt');
const {User , validate} = require ('../models/user');
const express = require ('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();


//every route handler is a technically a middleware function in express
router.get ('/' , async (req , res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id' , async (req , res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

router.post('/' , async (req , res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //verifying if the user is already registered or not
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered...');

    //if user not already registered then registering new user
    user = new User(_.pick(req.body , ['name' , 'email' , 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt);
    await user.save();

    // const token = jwt.sign({
    //     _id:  user._id,
    //     name: user.name,
    //     email: user.email
    // }, config.get('jwtPrivateKey'));

    const token = user.generateAuthToken();

    //headers have two arguments: ( x- header name , header value )
    res.header('x-auth-token' , token).send(_.pick(user , ['id' , 'name' , 'email' , 'isAdmin']));
});

router.put('/:id' , async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id , {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    } , {new: true});
    
    if(!user) return res.status(404).send('User with the given id not found....');

    res.send(user);
})

router.delete('/:id' , [auth , admin] , async (req , res) => {
   const user = await User.findByIdAndRemove(req.params.id);
   if(!user) return res.status(404).send('User with the given id not found...');
    res.send(user);
})

module.exports = router;