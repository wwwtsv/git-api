import express, { Application } from "express";
import routes from "api/routes/repo";

const app: Application = express();

app.use(routes);

app.listen(config.port, () =>
  console.log(`Server is listening on port ${config.port}!`)
);
