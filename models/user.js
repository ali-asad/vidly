const Joi = require ('joi');
const mongoose = require ('mongoose');
const config = require('config');
const jwt = require ('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean
    }
});


    userSchema.methods.generateAuthToken = function (){
        const token = jwt.sign({
            _id: this._id,
            name: this.name,
            email: this.email,
            password: this.password,
            isAdmin: this.isAdmin
        }, config.get('jwtPrivateKey'));
        return token;
    };

const User = mongoose.model('User' , userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user , schema);
}

exports.User = User;
exports.validate = validateUser;