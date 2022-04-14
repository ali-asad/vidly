const Joi = require ('joi');
const mongoose = require ('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Customer = mongoose.model('Customer' , customerSchema);

function validateCustomer (customer){
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(customer , schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;