import { createServer } from "./create-server.js";
import PORT from "./config/env-config.js";

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
