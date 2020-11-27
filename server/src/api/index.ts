import { Router } from "express";
import repo from "./routes/repo";

export default (): Router => {
  const routes = Router();
  repo(routes);
  return routes;
};
