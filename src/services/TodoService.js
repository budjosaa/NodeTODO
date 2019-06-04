const User = require("../models/userModel");
const TODO = require("../models/TODOModel");
const InvalidDataError = require("../errors/InvalidData");

module.exports = {
  create: async (user, data) => {
    const { title, description } = data;
    try {
      const userr = await User.findById(user._id);
      const todo = new TODO({
        title: title,
        description: description,
        user: user._id,
        isCompleted: false
      });
      await todo.save();
      userr.TODOs.push(todo._id);
      await userr.save();
      return todo;
    } catch (err) {
      throw err;
    }
  },
  index: async user => {
    const userId = user._id;
    try {
      const userr = await User.findById(userId).populate("TODOs");
      if (userr.TODOs === undefined) {
        throw new InvalidDataError("Undefined");
      } else {
        return userr.TODOs;
      }
    } catch (err) {
      throw new InvalidDataError();
    }
  },
  update: async (data, todoId) => {
    try {
      const todo = await TODO.findOneAndUpdate(
        { _id: todoId },
        { $set: data },
        { new: true }
      );
      return todo;
    } catch (err) {
      throw err;
    }
  },
  delete: async (user, todoId) => {
    const userId = user._id;
    try {
      const user = await User.findById(userId);
      const newTodos = user.TODOs.filter(td => todoId != td);
      user.TODOs = newTodos;
      await TODO.remove({ _id: todoId });
      await user.save();
      return todoId;
    } catch (err) {
      throw err;
    }
  }
};
