var express = require("express");
var router = express.Router();
const verifyToken = require("../middlewares/JWTVerify");
const TodoService = require("../services/TodoService");

router
  .route("/")

  .get(verifyToken, (req, res, next) =>
    TodoService.index(req.user)
      .then(data => res.send(data))
      .catch(next)
  )

  .post(verifyToken, (req, res, next) =>
    TodoService.create(req.user, {
      title: req.body.title,
      description: req.body.description
    })

      .then(data => res.send(data))
      .catch(next)
  );

router
  .route("/:todoId")

  .put(verifyToken, (req, res) =>
    TodoService.update(
      {
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted,
        priority: req.body.priority
      },
      req.params.todoId
    )
      .then(data => res.send(data))
      .catch(next)
  )

  .delete(verifyToken, (req, res, next) =>
    TodoService.delete(req.user, req.params.todoId)
      .then(data => res.send(data))
      .catch(next)
  );

module.exports = router;
