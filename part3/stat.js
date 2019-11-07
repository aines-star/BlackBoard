var mongoose = require('mongoose');
require('./models/bddconnect');

var orderModel = require('./models/orders');
var userModel = require('./models/users');
var ArticleModel = require('./models/articles');



var userpermonth = userModel.aggregate();

userpermonth.group({
    _id: { 
      inscription_month: {$month: '$dateInsert'}
    }, 
    usercount: { $sum: 1 }
});
userpermonth.exec(function(err, data) {
  console.log(data);  
});

var userstock = userModel.aggregate();

userstock.group({
    _id: { 
      stock: {stock: '$stock'}
    }, 
    usercount: { $sum: 1 }
});
userstock.exec(function(err, data) {
  console.log(data);

});
var panierpermonth = orderModel.aggregate();
panierpermonth.match({"status_payment":"valided"})
panierpermonth.group({ _id: {year: {$year:'$date_insert'}, month: { $month: '$date_insert'}},
average_basket:{$avg:'$total'}
})

panierpermonth.exec(function(err, data) {
  console.log(data);  
});

var panierperday = orderModel.aggregate();
panierperday.match({"status_payment":"valided","status_shipment":true})
panierperday.group({ _id: {year: {$year:'$date_insert'}, month: { $month: '$date_insert'}, day: {$dayOfMonth: '$date_insert'}},
CA:{$sum:'$total'}, count: {$sum: 1}
})

panierperday.exec(function(err, data) {
  console.log(data);  
});

var request = ArticleModel.find();
request.exec(function(err,stock){
    var total= 0;
    for (let i=0; i<stock.length; i++){
        total= total+stock[i].stock

    }
    console.log(total)

    
})

var request2 = userModel.find();
request2.exec(function(err,user){
    console.log(user)
    var total= 0;
    for (let i=0; i<user.length; i++){
        var allUser = user[i]
            for (let j = 0; j < allUser.messages.length; j++) {
                const msg = allUser.messages[j];
                console.log(msg)
               if ( !msg.read) {
                   total++
               }
                
                }

    }
console.log('++++++++ >>>  ',total)
    
})

var request3 = userModel.find();
request3.exec(function(err,user){
    console.log(user)
    var total= 0;
    for (let i=0; i<user.length; i++){
        var allUser = user[i]
            for (let j = 0; j < allUser.tasks.length; j++) {
                const tsk = allUser.tasks[j];
                console.log(tsk)
               if ( !tsk.read) {
                   total++
               }
                
        }

    }
console.log('++++++++ >>>  ',total)
    
})




