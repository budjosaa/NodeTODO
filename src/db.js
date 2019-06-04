const mongoose = require("mongoose");
module.exports = {
  connect: () => {
    mongoose.connect("mongodb://localhost:27017/todo", {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    var connection = mongoose.connection;
    connection.once("open", function() {
      console.log("CONNECTED!!!");
    });
  }
};
