import { readdir } from "fs/promises";
import { spawn } from "child_process";
import db from "loaders/lowdb";

export const getRepos = async (path: string): Promise<string[]> => {
  const files = await readdir(path);
  db.set("repos", files);
  return files;
};
export const getCommits = (path: string, repoName: string, hash: string, page?: string): Promise<string> => {
  const param = "^^param^^";
  const line = `^^line^^`;
  const prettyFormat = `%H${param}%b${param}%cd${line}`;
  return new Promise((resolve, reject) => {
    const log = spawn("git", ["log", "-n40", `--pretty=format:${prettyFormat}`, hash], { cwd: `${path}/${repoName}` });
    let result = "";
    log.stdout.on("data", (chunk) => {
      result += chunk.toString();
    });
    log.on("close", () => {
      const parseLog = result
        .replace(/\\\\n/, "")
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
        });
      resolve(JSON.stringify(parseLog));
    });
    log.stderr.on("data", (data) => {
      reject(`${data}`);
    });
    log.on("error", (err) => {
      reject(`${err}`);
    });
  });
};
export const getDiff = (path: string, repoName: string, hash: string) => {};
export const getRepositoryContent = (path: string, repoName: string, hash: string, dirictory: string) => {};
export const getFileContent = (path: string, repoName: string, hash: string, fileName: string) => {};
export const deleteRepository = (path: string, repoName: string) => {};
export const downloadRepository = (path: string, url: string) => {};
