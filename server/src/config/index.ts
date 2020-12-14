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
  repos: path.resolve(process.env.PATH_TO_REPO || "repos"),
  db: path.resolve("src", "db", "index.json"),
};
