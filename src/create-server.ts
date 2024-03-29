import express, { type Express } from "express";
import cors from "cors";
import { sequelize } from "./db.js";
import router from "./routes/routes.js";

export async function createServer(): Promise<Express> {
  const app = express();

  app.use(cors());
  app.use(express.json());

  try {
    await sequelize.authenticate();
  } catch (error) {
    app.use((req, res) => {
      res.status(500).send("Database connection error");
    });

    return app;
  }

  app.use("/", router);

  return app;
}
