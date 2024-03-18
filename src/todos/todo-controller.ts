import { type Request, type Response } from "express";

import {
  getAllTodos,
  updateTodo,
  updateTodosIndex,
  getAllUserTodos,
  createTodo,
  removeTodo,
  changeTodoStatus,
} from "./todo-service.js";

import { type TodoInstance } from "../interfaces/todo.js";

export const getAllTodosController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const allTodos = await getAllTodos();
  res.json(allTodos);
};

export const getAllUserTodosController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userID } = req.params;
  const userTodos = await getAllUserTodos(Number(userID), res);
  res.json(userTodos);
};

export const createTodoController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    title,
    description,
    userID,
    index,
  }: { title: string; description: string; userID: string; index: string } =
    req.body;
  await createTodo(title, description, userID, index);
  res.sendStatus(201);
};

export const removeTodoController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { todoID } = req.params;
  await removeTodo(todoID);
  res.sendStatus(204);
};

export const updateOneTodoController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { title, description }: { title: string; description: string } =
    req.body;
  const { todoID } = req.params;
  const updatedTodo = await updateTodo(title, description, todoID);
  if (updatedTodo === null) {
    res.sendStatus(404);
  } else {
    res.sendStatus(201);
  }
};

export const changeTodoStatusController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { todoID, status } = req.params;
  await changeTodoStatus(status, todoID, res);
};

export const updateTodosIndexController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const todos: TodoInstance[] = req.body.todos;
  const updatedTodos = await updateTodosIndex(todos);
  res.status(200).json({ updatedTodos });
};
