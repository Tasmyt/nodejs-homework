const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helper");
const Joi = require('joi');

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError);

const registerShema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

const loginShema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(), 
})

const subscriptionShema = Joi.object({
    subscription: Joi.string().required().valid("starter", "pro", "business"),
})

const shemas = {
    registerShema,
    loginShema,
    subscriptionShema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    shemas,
}