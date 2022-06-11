const mongoose = require("mongoose");
const config = require('../config/config');

const initDB = () => {
  mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected!!!');
  })
  .catch(error => console.log(error.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to database!!!');
  });

  mongoose.connection.on('error', error => {
    console.log(error.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected!!!');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination!!!'
      );
      process.exit(0);
    });
  });
}

module.exports = initDB;