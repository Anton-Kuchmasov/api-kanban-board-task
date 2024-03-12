import { v4 as uuidv4 } from "uuid";

import { Todos } from "../db.js";
import { ToDoStatus } from "../helpers/ToDoStatus.js";
import { type TodoInstance } from "../interfaces/todo.js";

export const findAllTodos = async (): Promise<TodoInstance[]> => {
  const result = await Todos.findAll();

  return result.map((todo) => todo.get({ plain: true }));
};

export const findAllTodosFromUser = async (
  userID: number,
): Promise<TodoInstance[]> => {
  const userTodos = await Todos.findAll({
    where: {
      userID,
    },
  });

  return userTodos.map((todo) => todo.get({ plain: true }));
};

export const createNewTodo = async (
  title: string,
  description: string,
  userID: number,
  index: number,
): Promise<TodoInstance> => {
  const rawNewTodo = await Todos.create({
    title,
    description,
    id: uuidv4(),
    userID,
    index,
    status: ToDoStatus.TODO,
  });

  const formattedNewTodo: TodoInstance = rawNewTodo.get({ plain: true });

  return formattedNewTodo;
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

export const updateStatus = async (
  status: string,
  id: string,
): Promise<TodoInstance | null> => {
  const todoToUpdate = await Todos.findOne({
    where: { id },
  });

  if (todoToUpdate !== null && todoToUpdate !== undefined) {
    await Todos.update({ status }, { where: { id } });
    return todoToUpdate.get({ plain: true });
  }

  return null;
};

export const deleteTodoById = async (
  todoId: string,
): Promise<TodoInstance | null> => {
  const todoToDelete = await Todos.findOne({
    where: {
      id: todoId,
    },
  });

  if (todoToDelete !== null && todoToDelete !== undefined) {
    await Todos.destroy({
      where: {
        id: todoId,
      },
    });

    return todoToDelete.get({ plain: true });
  }
  return null;
};
