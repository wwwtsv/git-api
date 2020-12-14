import express, { Application } from "express";
import config from "config";
import routes from "api";
import cors from "cors";
import bodyParser from "body-parser";

const startServer = () => {
  const app: Application = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());

  app
    .listen(config.port, () => console.log(`Server is listening on port ${config.port}!`))
    .on("error", (error) => {
      console.error(error);
      throw new Error(`${error}`);
    });
};

startServer();
