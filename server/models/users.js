const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: String,
    password: String
}, { timestamps: true});

module.exports = mongoose.model('MovieUsers', usersSchema, 'movieusers');