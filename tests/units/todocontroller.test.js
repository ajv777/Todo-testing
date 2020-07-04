const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");

TodoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
  // Test 1
  it("should have a create function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  // Test 2
  it("should call TodoModel.create", () => {
    TodoController.createTodo();
    expect(TodoModel.create).toBeCalled();
  });
});
