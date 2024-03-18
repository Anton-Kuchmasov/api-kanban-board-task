import { type Model } from "sequelize";
import { type ToDoStatus } from "../types/todo-status.js";

export interface TodoAttributes {
  id: number;
  title: string;
  description: string;
  userID: number;
  index: number;
  status: ToDoStatus;
}

export interface TodoInstance extends Model<TodoAttributes>, TodoAttributes {}
