const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

TodoModel.create = jest.fn();
// Before run each test: create a mock object with all the same methods that the original implementation
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TodoController.createTodo", () => {
  //Insted of repeat this code in each it
  beforeEach(() => {
    req.body = newTodo;
  });
  // Test 1
  it("should have a create function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  // Test 2
  it("should call TodoModel.create", () => {
    TodoController.createTodo(req, res, next);
    // expect(TodoModel.create).toBeCalled();
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  // Test 3
  it("should return 201 respond code", async () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy;
  });

  // Test 4
  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  // Test 5
  it("should handle errors", async () => {
    const errorMessage = { message: "Done property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
