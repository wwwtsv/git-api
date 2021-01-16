import { readdir } from "fs/promises";
import { spawn } from "child_process";
import rm from "rimraf";

const PARAM = "^^param^^";
const LINE = "^^line^^";

export const getRepos = async (path: string): Promise<string[]> => {
  const files = await readdir(path);
  return files;
};

export const getCommits = (path: string, repoName: string, hash: string, limit = ""): Promise<string> => {
  const prettyFormat = `%H${PARAM}%B${PARAM}%cd${LINE}`;
  const commitsPerPage = limit ? `-n ${limit}` : `-n 1000`;
  return gitAsyncProcess<string>(
    "git",
    ["log", commitsPerPage, `--pretty=format:${prettyFormat}`, hash],
    `${path}/${repoName}`,
    (result) => {
      return JSON.stringify(
        result
          .split("\n")
          .join("")
          .split(LINE)
          .map((commit) => {
            const [hash, message, date] = commit.split(PARAM);
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

export const getRepositoryContent = (path: string, repoName: string, hash: string): Promise<Array<string> | string> => {
  return gitAsyncProcess<Array<string>>("git", ["ls-tree", "--name-only", hash], `${path}/${repoName}`, (result) => {
    return result.split("\n");
  });
};

export const getLogForRepositoryContent = async (
  path: string,
  repoName: string,
  pathToFile: string,
  fileList: Array<string>
): Promise<Array<{ name: string; meta: string }>> => {
  const prettyFormat = `%h${PARAM}%B${PARAM}%cn${PARAM}%cd${LINE}`;
  const getFilesMeta = await Promise.all(
    fileList.map(async (file: string) => {
      return gitAsyncProcess(
        "git",
        ["log", "-n 1", `--pretty=format:${prettyFormat}`, `${pathToFile}${file}`],
        `${path}/${repoName}`,
        (result) => {
          return JSON.stringify(
            result
              .split("\n")
              .join("")
              .split(LINE)
              .slice(0, 1)
              .map((commit) => {
                const [hash, message, committer, date] = commit.split(PARAM);
                return {
                  hash,
                  message,
                  committer,
                  date,
                };
              })[0]
          );
        }
      );
    })
  );
  return new Promise((resolve, reject) => {
    try {
      const fileData = fileList.map((file, index) => ({
        name: file,
        meta: getFilesMeta[index],
      }));
      resolve(fileData);
    } catch (e) {
      reject(e);
    }
  });
};

export const getFileContent = (path: string, repoName: string, hash = "master", fileName?: string): Promise<string> => {
  const currentFile = fileName ? `${hash}:${fileName}` : hash;
  return gitAsyncProcess<string>("git", ["show", currentFile], `${path}/${repoName}`, (result) => {
    return result;
  });
};

export const getBranches = async (
  path: string,
  repoName: string
): Promise<Array<{ name: string; time: string }> | string> => {
  const currentPath = `${path}/${repoName}`;
  const branches = await gitAsyncProcess<Array<string>>("git", ["branch", "--all"], currentPath, (result) => {
    return result
      .split("\n")
      .map((branch) => branch.replace(/\W/, "").trim())
      .filter(Boolean);
  });
  if (Array.isArray(branches)) {
    const lastCommitInBranch = await Promise.all(
      branches.map(async (branch) => {
        return gitAsyncProcess<string>(
          "git",
          ["log", "-n 1", `${branch}`, "--pretty=format:%cr"],
          currentPath,
          (result) => result
        );
      })
    );
    return Promise.resolve(
      branches.map((branch, index) => {
        return {
          name: branch,
          time: lastCommitInBranch[index],
        };
      })
    );
  } else {
    return Promise.reject("File get branch data");
  }
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
  args: Array<string> = [""],
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
