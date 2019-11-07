var mongoose = require('mongoose');

var messagesSchema = mongoose.Schema({
    title:String,
    content:String,
    dateExp:Date,
    read:Boolean,
    sender:String
})

var tasksSchema = mongoose.Schema({
    name:String,
    content:String,
    category:String,
    dateInsert:Date,
    owner:String,
    dateDue:Date,
    dateCloture:Date
})

var usersSchema = mongoose.Schema({
    messages:[messagesSchema],
    tasks:[tasksSchema],
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
