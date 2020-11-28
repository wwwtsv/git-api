import { readdir } from "fs/promises";
import db from "loaders/lowdb";

export const getRepos = async (path: string): Promise<string[]> => {
  const files = await readdir(path);
  db.set("repos", files);
  return files;
};
export const getCommits = () => {};
export const getDiff = () => {};
export const getRepositoryContent = () => {};
export const getFileContent = () => {};
export const deleteRepository = () => {};
export const downloadRepository = () => {};
