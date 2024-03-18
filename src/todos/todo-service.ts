import { type Response } from "express";

import { Todos } from "../db.js";

import {
  findAllTodos,
  findAllTodosFromUser,
  createNewTodo,
  deleteTodoById,
  updateStatus,
  updateIndexes,
} from "./todo-repository.js";

import { type TodoInstance } from "../interfaces/todo.js";
import { normalizeNumberID } from "../helpers/normalize-number-id.js";

export const getAllTodos = async (): Promise<TodoInstance[]> => {
  return await findAllTodos();
};

export const getAllUserTodos = async (
  userID: number,
  res: Response,
): Promise<TodoInstance[]> => {
  const todos = await findAllTodosFromUser(userID);
  return todos;
};

export const createTodo = async (
  title: string,
  description: string,
  userID: string,
  index: string,
): Promise<void> => {
  const normalizedTitle: string = title.trim();
  const normalizedUserID: number = normalizeNumberID(userID);
  const normalizedIndex: number = normalizeNumberID(index);

  if (
    normalizedTitle.length === 0 ||
    normalizedUserID < 1 ||
    normalizedIndex < 1
  ) {
    throw new Error("Incorrect input data!");
  }

  await createNewTodo(
    normalizedTitle,
    description,
    normalizedUserID,
    normalizedIndex,
  );
};

export const removeTodo = async (
  todoId: string,
): Promise<TodoInstance | null> => {
  if (!todoId) {
    throw new Error("Invalid todo ID");
  }

  return await deleteTodoById(todoId);
};

export const updateTodo = async (
  title: string,
  description: string,
  id: string,
): Promise<TodoInstance | null> => {
  const todoToUpdate = await Todos.findOne({
    where: { id },
  });

  if (todoToUpdate !== null && todoToUpdate !== undefined) {
    await Todos.update({ title, description }, { where: { id } });

    return todoToUpdate.get({ plain: true });
  }

  return null;
};

export const changeTodoStatus = async (
  status: string,
  id: string,
  res: Response,
): Promise<void> => {
  const updatedTodo = await updateStatus(status, id);
  if (updatedTodo === null) {
    res.sendStatus(400);
  } else {
    res.sendStatus(201);
  }
};

export const updateTodosIndex = async (
  todos: TodoInstance[],
): Promise<TodoInstance[]> => {
  const updatedTodos = await updateIndexes(todos);
  return updatedTodos;
};
