import { Router } from "express";

const router = Router();

export default (app: Router): void => {
  app.use("/repos", router);
  router
    .get("/")
    .get("/:repositoryId/commits/:commitHash")
    .get("/:repositoryId/commits/:branch/:page")
    .get("/:repositoryId/commits/:commitHash/diff")
    .get("/:repositoryId(/tree/:commitHash/:path)")
    .get("/:repositoryId/blob/:commitHash/:pathToFile")
    .delete("/:repositoryId")
    .post("/");
};
