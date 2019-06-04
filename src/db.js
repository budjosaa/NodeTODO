const mongoose = require("mongoose");

module.exports = {
  connect: () => {
    mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${
        process.env.MONGO_DB_NAME
      }`,
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    );
    var connection = mongoose.connection;
    connection.once("open", function() {
      console.log("CONNECTED!!!");
    });
  }
};
