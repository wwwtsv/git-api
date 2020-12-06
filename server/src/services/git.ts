import { readdir } from "fs/promises";
import { spawn } from "child_process";
import db from "loaders/lowdb";

export const getRepos = async (path: string): Promise<string[]> => {
  const files = await readdir(path);
  db.set("repos", files);
  return files;
};
export const getCommits = (
  path: string,
  repoName: string,
  hash: string,
  page?: string,
  limit?: string
): Promise<string> => {
  const param = "^^param^^";
  const line = `^^line^^`;
  const prettyFormat = `%H${param}%b${param}%cd${line}`;
  const gitLogLimit = limit ? `-n${limit}` : "";
  return gitAsyncProcess<string>(
    "git",
    ["log", gitLogLimit, `--pretty=format:${prettyFormat}`, hash],
    `${path}/${repoName}`,
    (result) => {
      return JSON.stringify(
        result
          .split("\n")
          .join("")
          .split(line)
          .filter(Boolean)
          .map((commit) => {
            const [hash, message, date] = commit.split(param);
            return {
              hash,
              message,
              date,
            };
          })
      );
    }
  );
};
export const getDiff = (path: string, repoName: string, hash: string): Promise<string> => {
  return gitAsyncProcess<string>("git", ["diff", hash], `${path}/${repoName}`, (result) => {
    return result;
  });
};
export const getRepositoryContent = (
  path: string,
  repoName: string,
  hash: string,
  directory?: string
): Promise<Array<string> | string> => {
  const pathToFile = directory ? `${hash}:${directory}` : hash;
  return gitAsyncProcess<Array<string>>(
    "git",
    ["ls-tree", "--name-only", pathToFile],
    `${path}/${repoName}`,
    (result) => {
      return result.split("\n");
    }
  );
};
export const getFileContent = (path: string, repoName: string, hash = "master", fileName?: string): Promise<string> => {
  const currentFile = fileName ? `${hash}:${fileName}` : hash;
  return gitAsyncProcess<string>("git", ["show", currentFile], `${path}/${repoName}`, (result) => {
    return result;
  });
};
export const deleteRepository = (path: string, repoName: string) => {};
export const downloadRepository = (path: string, url: string) => {};

const gitAsyncProcess = <T>(
  command = "git",
  args: Array<string> = [],
  dir = "",
  cb: (result: string) => T
): Promise<T | string> => {
  return new Promise((resolve, reject) => {
    const gitChildProcess = spawn(command, args, { cwd: dir });
    let result = "";
    gitChildProcess.stdout.on("data", (chunk) => {
      result += chunk;
    });
    gitChildProcess.on("close", () => {
      const handing = cb(result);
      resolve(handing);
    });
    gitChildProcess.stderr.on("error", (err) => {
      reject(`${err}`);
    });
    gitChildProcess.on("error", (err) => {
      reject(`${err}`);
    });
  });
};
