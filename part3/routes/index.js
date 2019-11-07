var express = require('express');
var router = express.Router();

var ArticleModel = require('../models/articles');
var userModel = require('../models/users');
var ordersModel = require('../models/orders')

var dateFormat = require('../fonction')

router.get('/', function(req, res, next) {
  var tasksList = []
  var messagesList = []
  ArticleModel.find(function(err,articles){
    console.log(articles)
   })
  userModel.find(function(err,users){
    // console.log(users)
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      // console.log(element.tasks);
      const tasks= element.tasks
      const messages= element.messages

     for (let j = 0; j <tasks.length; j++) {
       const userTasks = tasks[j];
      //  console.log(userTasks);
      var datejour= new Date();
      if (userTasks.dateCloture>datejour){
      tasksList.push(userTasks)
     }
    }
     for (let j = 0; j <messages.length; j++) {
      const userMessages = messages[j];
      // console.log(userMessages);
      if (userMessages.read==false){
        messagesList.push(userMessages)
      }
     
    }
    }
    res.render('index', { title: 'Express',tasksList,messagesList,users });
  
  })
});


/* GET tasks page. */
router.get('/tasks-page', function(req, res, next) {

  var taskList = [];

  userModel.find(function(error,users){
    
    for(var i = 0; i<users.length;i++){

      taskList.push({
        name:users[i].tasks[0].name,
        description:users[i].tasks[0].description,
        category: users[i].tasks[0].category,
        dateInsert: users[i].tasks[0].dateInsert,
        dateDue: users[i].tasks[0].dateDue,
        dateCloture:users[i].tasks[0].dateCloture,
        owner: users[i].tasks[0].owner,
      })
    }
    res.render('tasks', {taskList,dateFormat});
  })

});

/* GET Messages page. */
router.get('/messages-page', function(req, res, next) {

  var messageList = [];

  userModel.find(function(error,users){
    console.log(users)

    for(var i = 0; i<users.length;i++){

      messageList.push({
        title: users[i].messages[0].title, //We use message[0] because we want to take the first message
        description:users[i].messages[0].description,
        dateExp: users[i].messages[0].dateExp,
        read: users[i].messages[0].read,
        sender: users[i].messages[0].sender
      })

    }

    res.render('messages', {messageList,dateFormat});
  })
});



/* GET Messages page. */
router.get('/users-page', function(req, res, next) {

  userModel.find(function(err,users){
    console.log(users)
    res.render('users', {users,dateFormat});
  })
});




/* GET Messages page. */
router.get('/catalog-page', function(req, res, next) {

  ArticleModel.find(function(err,articles){
    console.log(articles)
    res.render('catalog', {articles,dateFormat});
  })
});

/* GET Messages page. */
router.get('/orders-list-page', function(req, res, next) {
  var request = ordersModel.find();
  request.sort({date_insert: -1});
  request.exec(function(err, orders) {
    console.log(orders);
    res.render('orders-list', {orders,dateFormat});
  });
  // ordersModel.find(function(error,orders){
  //   // console.log('here is our ordersList -->', orders)
  
});

/* GET Messages page. */
router.get('/order-page', function(req, res, next) {

  console.log(req.query)

  ordersModel.findById(req.query.id)
  .populate('articles')
  .populate('user')
  .exec(function(error,order){
    res.render('order', {order,dateFormat});
  })

});



module.exports = router;
