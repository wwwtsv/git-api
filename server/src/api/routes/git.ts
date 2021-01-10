import { Router } from "express";
import {
  deleteRepository,
  downloadRepository,
  getCommits,
  getDiff,
  getFileContent,
  getLogForRepositoryContent,
  getRepos,
  getRepositoryContent,
} from "services/git";
import config from "config";

const router = Router();

export default (app: Router): void => {
  const PATH_TO_REPO = config.repos;
  app.use("/repos", router);
  router
    .get("/", async (req, res, next) => {
      try {
        const files = await getRepos(PATH_TO_REPO);
        res.status(200).json(files);
      } catch (err) {
        next(err);
      }
    })
    .get("/:repositoryId/commits/:commitHash", async (req, res, next) => {
      try {
        const { repositoryId, commitHash } = req.params;
        const commits = await getCommits(PATH_TO_REPO, repositoryId, commitHash);
        res.status(200).json(commits);
      } catch (err) {
        next(err);
      }
    })
    .get("/:repositoryId/commits/:commitHash/diff", async (req, res, next) => {
      try {
        const { repositoryId, commitHash } = req.params;
        const diff = await getDiff(PATH_TO_REPO, repositoryId, commitHash);
        res.status(200).json(diff);
      } catch (err) {
        next(err);
      }
    })
    .get("/:repositoryId/tree/:commitHash?/:path*?", async (req, res, next) => {
      try {
        const { repositoryId, commitHash, path } = req.params;
        const resolveDirectory = path ? `${commitHash}:${path}` : commitHash;
        const resolveBranchName = resolveDirectory || "HEAD";
        const resolvePath = path ? `${path}/` : "./";
        const repositoryContent = (await getRepositoryContent(
          PATH_TO_REPO,
          repositoryId,
          resolveBranchName
        )) as string[];
        const gitLogForFiles = await getLogForRepositoryContent(
          PATH_TO_REPO,
          repositoryId,
          resolvePath,
          repositoryContent
        );
        res.status(200).json(gitLogForFiles);
      } catch (err) {
        next(err);
      }
    })
    .get("/:repositoryId/blob/:commitHash?/:pathToFile*", async (req, res, next) => {
      try {
        const { repositoryId, commitHash, pathToFile } = req.params;
        const fileContent = await getFileContent(PATH_TO_REPO, repositoryId, commitHash, pathToFile);
        res.status(200).json(fileContent);
      } catch (err) {
        next(err);
      }
    })
    .delete("/:repositoryId", async (req, res, next) => {
      try {
        const { repositoryId } = req.params;
        const deleteRepo = await deleteRepository(PATH_TO_REPO, repositoryId);
        res.status(200).json(deleteRepo);
      } catch (err) {
        next(err);
      }
    })
    .post("/", async (req, res, next) => {
      try {
        const { repoUrl } = req.body;
        const downloadRepo = await downloadRepository(PATH_TO_REPO, repoUrl);
        res.status(200).json(downloadRepo);
      } catch (err) {
        next(err);
      }
    })
    .get("/:repositoryId/commits/:commitHash/:perPage", async (req, res, next) => {
      try {
        const { repositoryId, commitHash } = req.params;
        const commits = await getCommits(PATH_TO_REPO, repositoryId, commitHash);
        res.status(200).json(commits);
      } catch (err) {
        next(err);
      }
    });
};
