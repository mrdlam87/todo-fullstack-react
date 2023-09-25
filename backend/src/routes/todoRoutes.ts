import express from "express";
import * as todoController from "../controllers/todoController";

const todoRouter = express.Router({ mergeParams: true });

todoRouter
  .route("/")
  .get(todoController.getAllUserTodos)
  .post(todoController.setTodoUserIds, todoController.createUserTodo);
todoRouter
  .route("/:id")
  .get(todoController.getUserTodo)
  .patch(todoController.updateUserTodo)
  .delete(todoController.deleteUserTodo);

export { todoRouter };
