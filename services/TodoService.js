const User = require("../models/userModel");
const TODO = require("../models/TODOModel");
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
      throw new Error({ message: "ne radi nesto" });
    }
  },
  index: async user => {
    const userId = user._id;
    try {
      const userr = await User.findById(userId).populate("TODOs");
      if (userr.TODOs === undefined || userr.TODOs.length === 0) {
        const message = "No todos!";
        return message;
      } else {
        return userr.TODOs;
      }
    } catch (err) {
      throw new Error({ message: "errors.permissions.denied" });
    }
  },
  update: async (user, data, todoId) => {
    const userId = user._id;

    const { title, description, isCompleted, priority } = data;
    try {
      const user = await User.findById(userId);
      const todo = await TODO.findById(todoId);
      todo.title = title;
      todo.description = description;
      todo.isCompleted = isCompleted;
      todo.priority = priority;
      await todo.save();
      const newTodos = await user.TODOs.filter(td => todoId != td);
      newTodos.push(todo);
      user.TODOs = newTodos;
      await user.save();
      return todo;
    } catch (err) {
      throw err;
    }
  },
  delete: async (user, todoId) => {
    const userId = user._id;
    try {
      const user = await User.findById(userId);
      const todo = await TODO.findById(todoId);
      const newTodos = user.TODOs.filter(td => todoId != td);
      user.TODOs = newTodos;
      await TODO.remove({ _id: todoId });
      await user.save();
      return todo;
    } catch (err) {
      throw err;
    }
  }
};
