import { readdir } from "fs/promises";
import { spawn } from "child_process";
import rm from "rimraf";

export const getRepos = async (path: string): Promise<string[]> => {
  const files = await readdir(path);
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
  return gitAsyncProcess<string>(
    "git",
    ["log", `--pretty=format:${prettyFormat}`, hash],
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
  const resolveDirectory = directory ? `${hash}:${directory}` : hash;
  const resolveBranchName = resolveDirectory || "HEAD";
  return gitAsyncProcess<Array<string>>(
    "git",
    ["ls-tree", "--name-only", resolveBranchName],
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

export const deleteRepository = (path: string, repoName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    rm(`${path}/${repoName}`, (error) => {
      reject(`${error}`);
    });
    resolve(`Repository ${repoName} was delete`);
  });
};

export const downloadRepository = (path: string, url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const clone = spawn("git", ["clone", url], { cwd: path });
    clone.on("close", () => {
      setTimeout(() => {
        const reposList = readdir(path);
        const getDownloadRepository = url.split("/").slice(-1)[0];
        const currentDownloadRepository = getDownloadRepository.split(".")[0];
        reposList.then((repos) => {
          const checkExistingRepo = repos.some((repo) => repo === currentDownloadRepository);
          if (checkExistingRepo) {
            resolve(`Repository '${currentDownloadRepository}' download`);
          }
          reject(`Repository '${currentDownloadRepository}' failed to download`);
        });
      }, 10000);
    });
    clone.on("error", (err) => {
      reject(`${err}`);
    });
  });
};

const gitAsyncProcess = <T>(
  command = "git",
  args: Array<string> = [],
  dir = "",
  middleware: (result: string) => T
): Promise<T | string> => {
  return new Promise((resolve, reject) => {
    const gitChildProcess = spawn(command, args, { cwd: dir });
    let result = "";
    gitChildProcess.stdout.on("data", (chunk) => {
      result += chunk;
    });
    gitChildProcess.on("close", () => {
      const handing = middleware(result);
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
