const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TODOs = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  isCompleted: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["high", "low", "medium"],
    default: "medium"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
const TODO = mongoose.model("TODO", TODOs);
module.exports = TODO;
