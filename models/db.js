const mongoose = require('mongoose');
require('./musicians.model');

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    });

mongoose.connection
          .on('open', () => {
                    console.log('Mongoose connection open');
          })
          .on('error', (err) => {
                    console.log(`Connection error: ${err.message}`);
          });

