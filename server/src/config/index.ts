import dotenv from "dotenv";
import path from "path";
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000,
  api: {
    prefix: "/api",
  },
  repos: path.resolve(__dirname, process.env.PATH_TO_REPO || "services/repos"),
  db: path.resolve(__dirname, "server/db/index.json"),
};
