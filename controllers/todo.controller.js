const TodoModel = require("../model/todo.model");
exports.createTodo = (req, res, next) => {
  const createModel = TodoModel.create(req.body);
  // test 3 res.status(201).send();
  res.status(201).json(createModel);
};
