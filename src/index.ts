import dotenv from "dotenv";
import { createServer } from "./createServer.js";

dotenv.config();

const PORT = process.env.PORT ?? 3001;

async function startServer(): Promise<void> {
  try {
    const server = await createServer();
    server.listen(PORT, () => {
      console.log(`Running API Server on ${PORT}`);
    });
  } catch (error) {
    console.error("Server creation error:", error);
  }
}

await startServer();
