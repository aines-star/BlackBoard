var express = require('express');
var router = express.Router();

var ArticleModel = require('../models/articles');
var userModel = require('../models/users');
var tasksSchema = require('../models/users');
var messagesSchema = require('../models/users');
var orderModel= require('../models/order');

var dateFormat = function (date) {
  var newDate = new Date(date);
  var format = newDate.getDate() + '/' + newDate.getMonth() + '/' + newDate.getFullYear();
  return format
};

/* GET home page. */
router.get('/', function(req, res, next) {
  var tasksList = []
  var messagesList = []
  userModel.find(function(err,users){
    console.log(users)
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      console.log(element.tasks);
      const tasks= element.tasks
      const messages= element.messages

     for (let j = 0; j <tasks.length; j++) {
       const userTasks = tasks[j];
       console.log(userTasks);
      tasksList.push(userTasks)
     }
     for (let j = 0; j <messages.length; j++) {
      const userMessages = messages[j];
      console.log(userMessages);
     messagesList.push(userMessages)
    }
    }
    res.render('index', { title: 'Express',tasksList,messagesList,users });
  
  })
});

/* GET tasks page. */
router.get('/tasks-page', function(req, res, next) {
  
    var tasksList = []
    userModel.find(function(err,users){
      console.log(users)
      for (let i = 0; i < users.length; i++) {
        const element = users[i];
        console.log(element.tasks);
        const tasks= element.tasks
       for (let j = 0; j <tasks.length; j++) {
         const userTasks = tasks[j];
         console.log(userTasks);
        tasksList.push(userTasks)
       }
      }
      res.render('tasks', { tasksList ,dateFormat});
    
    })
   
  });
  


/* GET Messages page. */
router.get('/messages-page', function(req, res, next) {
  var messagesList = []
  userModel.find(function(err,users){
    console.log(users)

    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      console.log(element.messages);
      const messages= element.messages
     for (let j = 0; j <messages.length; j++) {
       const userMessages = messages[j];
       console.log(userMessages);
      messagesList.push(userMessages)
     }
    }
    res.render('messages', { messagesList,dateFormat });
  
  })
 
});



/* GET Messages page. */
router.get('/users-page', function(req, res, next) {

  userModel.find(function(err,users){
    console.log(users)
    res.render('users', {users});
  })
});




/* GET Messages page. */
router.get('/catalog-page', function(req, res, next) {

  ArticleModel.find(function(err,articles){
    console.log(articles)
    res.render('catalog', {articles});
  })
});

/* GET Messages page. */
router.get('/orders-list-page', function(req, res, next) {
  orderModel.find(function(err,orders){
    console.log(orders);
    res.render('orders-list', { orders,dateFormat });
  })
});

/* GET Messages page. */
router.get('/order-page', function(req, res, next) {
  console.log("numero de comm",req.query)
  orderModel.findOne({_id:req.query.macommande})
 .populate('user')
 .populate('articles')
 .exec(function (err,order){
  res.render('order', { title: 'Express', order}); 
});

});


module.exports = router;
