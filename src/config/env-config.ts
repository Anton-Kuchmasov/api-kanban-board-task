import dotenv from "dotenv";

const envData = dotenv.config();

const defaultPort = "3001";

if (envData.error ?? !envData.parsed) {
  console.error(
    "Error while configuring, please check your .env file: ",
    envData.error,
  );
  process.exit(1);
}

let PORT = envData.parsed.PORT;

if (
  Number.isInteger(Number(PORT)) &&
  Number(PORT) > 0 &&
  Number(PORT) < 65536
) {
  PORT = defaultPort;
}

export default PORT;
