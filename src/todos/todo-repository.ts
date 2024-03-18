import { v4 as uuidv4 } from "uuid";

import { Todos } from "../db.js";
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
): Promise<void> => {
  await Todos.create({
    title,
    description,
    id: uuidv4(),
    userID,
    index,
  });
};

export const deleteTodoById = async (
  todoId: string,
): Promise<TodoInstance | null> => {
  const todoToDelete = await Todos.findOne({
    where: {
      id: todoId,
    },
  });

  if (!todoToDelete) {
    return null;
  }

  await Todos.destroy({
    where: {
      id: todoId,
    },
  });

  return todoToDelete.get({ plain: true });
};

export const findTodoById = async (
  id: string,
): Promise<TodoInstance | null> => {
  const foundedTodo = await Todos.findOne({
    where: { id },
  });

  return foundedTodo !== null ? foundedTodo.get({ plain: true }) : null;
};

export const updateStatus = async (
  status: string,
  id: string,
): Promise<TodoInstance | null> => {
  const todoToUpdate = await Todos.findOne({
    where: { id },
  });

  if (todoToUpdate !== null) {
    await Todos.update({ status }, { where: { id } });
    return todoToUpdate.get({ plain: true });
  }
  return null;
};

export const updateIndexes = async (
  todosToUpdate: TodoInstance[],
): Promise<TodoInstance[]> => {
  const updatedTodos: TodoInstance[] = [];

  for (let i = 0; i < todosToUpdate.length; i++) {
    const todo = todosToUpdate[i];

    await Todos.update({ index: i + 1 }, { where: { id: todo.id } });

    const updatedTodo = await Todos.findOne({
      where: { id: todo.id },
    });

    if (updatedTodo) {
      updatedTodos.push(updatedTodo.get({ plain: true }) as TodoInstance);
    }
  }

  return updatedTodos;
};
