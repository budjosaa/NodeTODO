var express = require("express");
var router = express.Router();
var User = require("../models/userModel");
const verifyToken = require("../middlewares/JWTVerify");
const TodoService = require("../services/TodoService");

/* GET users listing. */
// router.get("/", function(req, res, next) {
//   User.find().then(users => {
//     res.json(users);
//   });

router
  .route("/")
  .get(verifyToken, (req, res, next) =>
    TodoService.index(req.user)
      .then(data => res.send(data))
      .catch(err => next(err))
  )
  .post(verifyToken, (req, res, next) =>
    TodoService.create(req.user, {
      title: req.body.title,
      description: req.body.description
    })

      .then(data => res.send(data))
      .catch(err => next(err))
  );

router
  .route("/:todoId")
  .put(verifyToken, (req, res) =>
    TodoService.update(
      req.user,
      {
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted,
        priority: req.body.priority
      },
      req.params.todoId
    )
      .then(data => res.send(data))
      .catch(err => next(err))
  )

  .delete(verifyToken, (req, res, next) =>
    TodoService.delete(req.user, req.params.todoId)
      .then(data => res.send(data))
      .catch(err => next(err))
  );

module.exports = router;
