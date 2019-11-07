const mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };


   mongoose.connect('mongodb://admin:azerty1@ds247410.mlab.com:47410/blackboardsandbox',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** blackboardapp La Capsule Database connection : Success ***');
    }
   }
);     

module.exports = mongoose;