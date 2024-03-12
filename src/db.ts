import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { todos } from "./models/todos.js";

dotenv.config();

const { DB_URL } = process.env;

if (typeof DB_URL !== "string") {
  process.exit(1);
}

export const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const Todos = sequelize.define("Todos", todos, {
  tableName: "todos",
  createdAt: false,
  updatedAt: false,
});
