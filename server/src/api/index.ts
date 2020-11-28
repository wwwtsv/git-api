import { Router } from "express";
import repo from "./routes/git";

export default (): Router => {
  const routes = Router();
  repo(routes);
  return routes;
};
