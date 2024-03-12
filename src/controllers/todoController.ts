import { type Request, type Response } from "express";
import {
  createNewTodo,
  deleteTodoById,
  findAllTodos,
  findAllTodosFromUser,
  updateStatus,
  updateTodo,
} from "../services/todoService.js";
import { normalizeNumberID } from "../helpers/normalizeNumberID.js";

export const getAllTodos = (req: Request, res: Response): void => {
  findAllTodos()
    .then((todos) => res.json(todos))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

export const getAllUserTodos = (req: Request, res: Response): void => {
  const { userID } = req.params;
  const normalizedUsedID = Number(userID);

  if (isNaN(normalizedUsedID) || normalizedUsedID < 1) {
    res.sendStatus(400);
    return;
  }
  findAllTodosFromUser(normalizedUsedID)
    .then((todos) => res.json(todos))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

export const createTodo = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const {
      title,
      description,
      userID,
      index,
    }: { title: string; description: string; userID: string; index: string } =
      req.body;

    const normalizedTitle: string = title.trim();
    const normalizedUserID: number = normalizeNumberID(userID);
    const normalizedIndex: number = normalizeNumberID(index);

    if (
      normalizedTitle.length === 0 ||
      normalizedUserID < 1 ||
      normalizedIndex < 1
    ) {
      return res.sendStatus(400).send("Incorrect input data!");
    }

    const newTodo = await createNewTodo(
      normalizedTitle,
      description,
      normalizedUserID,
      normalizedIndex,
    );

    res.status(201).json(newTodo);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const updateOneTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, description }: { title: string; description: string } =
      req.body;
    const { todoID } = req.params;

    const updatedTodo = await updateTodo(title, description, todoID);

    if (updatedTodo === null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(201);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export const changeStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { todoID, sendStatus } = req.params;

    const updatedTodo = await updateStatus(sendStatus, todoID);

    if (updatedTodo === null) {
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export const removeTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { todoID } = req.params;

    await deleteTodoById(todoID);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
