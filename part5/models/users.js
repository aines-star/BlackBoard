var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    name:String,
    description:String,
    category: String,
    dateInsert: Date,
    dateDue: Date,
    dateCloture:Date,
    owner: String,
})

var messageSchema = mongoose.Schema({
    title: String,
    description:String,
    dateExp: Date,
    read: Boolean,
    sender: String
})

var usersSchema = mongoose.Schema({
    messages:[messageSchema],
    tasks:[taskSchema],
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    age: Number,
    status: String,
    gender:String,
    dateInsert: Date
})

module.exports = mongoose.model('users', usersSchema)