import { Router } from "express";
import {
  changeStatus,
  createTodo,
  getAllTodos,
  getAllUserTodos,
  removeTodo,
  updateOneTodo,
  updateTodosIndexes,
} from ".././controllers/todoController.js";

const router = Router();

router.get("/todos", getAllTodos);
router.patch("/todos/update", updateTodosIndexes);
router.get("/todos/:userID", getAllUserTodos);

router.post("/todos", createTodo);
router.delete("/todos/:todoID", removeTodo);

router.patch("/todos/:todoID/:status", changeStatus);
router.patch("/todos/:todoID", updateOneTodo);

export default router;
