console.log('My stats.js file is now ready to be use again')

require('./models/bddconnect');
var mongoose = require('mongoose');





var ordersSchema = mongoose.Schema({
    total: Number,
    shipping_cost: String,
    date_insert: Date,
    status_payment: String,
    date_payment: Date,
    status_shipment: Boolean,
    date_shipment: Date,
    delivery_address: String,
    delivery_city: String, 
    delivery_zipcode: String,
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    articles : [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles'}]
})

var ordersModel = mongoose.model('orders', ordersSchema)

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

var userModel = mongoose.model('users', usersSchema)

var articlesSchema = mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    stock:Number,
    weight: Number,
    img: String
})

var articlesModel = mongoose.model('articles', articlesSchema)


// Here we will write our request

// Number 1
var aggregate = userModel.aggregate();
aggregate.group({
     _id: {year: {$year:'$dateInsert'}, month:{ $month: '$dateInsert'}},
     usercount: {$sum:1}  })
    
aggregate.exec(function(error,data){
    console.log('YEARS : ',data)
})
    

// Number 2
var aggregate = userModel.aggregate()

aggregate.group({

    _id: {year: {$year: '$dateInsert'}, month:{ $month: '$dateInsert' }, gender: '$gender'},
    usercount: {$sum:1}

})
aggregate.exec(function(error,data){
    console.log(data)
})

// Number 3

var aggregate = ordersModel.aggregate()
    aggregate.match({"status_payment": "valided"})
    aggregate.group({
         _id: {year: {$year:'$date_insert'}, month: { $month: '$date_insert'}},
         average_basket:{$avg:'$total'}
    })

    aggregate.exec(function(error,data){
        console.log(data)
    })


// Number 4

var aggregate = ordersModel.aggregate()

aggregate.match({"status_payment": "valided", "status_shipment":true})
aggregate.group({ _id: {year: {$year:'$date_insert'}, month:{ $month: '$date_insert'}, day: {$dayOfMonth: '$date_insert'}},
CA:{$sum: '$total'}, count: {$sum: 1}
})

aggregate.exec(function(err,data){
    console.log(data)
})



// BONUS PART -------------------

//  TOTAL ARTICLES REQUEST

var requestTotalArticles = articlesModel.find()

requestTotalArticles.exec(function(error,article){

    var Total = 0;

    for(var i = 0; i<article.length; i++){
        Total = Total + article[i].stock
    }
    
    console.log('Total articles -->', Total)
})

// Resquest number 6 : unread messages

var request = userModel.find()

request.exec(function(error,user){


    var Total = 0;

    for( var i = 0; i<user.length; i++){
        for(var j = 0; j<user[i].messages.length; j++){
            if(!user[i].messages[j].read){
                Total++
            }

        }

    }

    console.log('Unread messages counter --->', Total)
})

// Request Number 7 -------------- Unclosed Tasks

var request2 = userModel.find();

request2.exec(function(error,user){

    var TotalUnclosedTasks = 0;

    for(var i = 0; i<user.length; i++){
        
        
        for(var j = 0; j<user[i].tasks.length; j++){
            
            if(!user[i].tasks[j].dateCloture)(
                TotalUnclosedTasks++
            )

        }

    }
console.log('Unclosed Tasks --->', TotalUnclosedTasks)
})

    