import { Router } from "express";

import { errorHandlerMiddleware } from "./../middlewares/error-handler.js";

import {
  changeTodoStatusController,
  createTodoController,
  getAllTodosController,
  getAllUserTodosController,
  removeTodoController,
  updateOneTodoController,
  updateTodosIndexController,
} from "../todos/todo-controller.js";
import { checkRequestBody } from "../middlewares/check-request-body.js";

const router = Router();

router.get("/todos", getAllTodosController);
router.get("/todos/:userID", getAllUserTodosController);

router.post("/todos", createTodoController);

router.delete("/todos/:todoID", removeTodoController);

router.patch("/todos/update", checkRequestBody, updateTodosIndexController);
router.patch("/todos/:todoID/:status", changeTodoStatusController);
router.patch("/todos/:todoID", updateOneTodoController);

router.use(errorHandlerMiddleware);

export default router;
