import { ActionContext } from "vuex";
import { RootState } from "@app/store";

export const enum MutationTypes {
  SET_DEVICE = "SET_DEVICE",
  SET_FILE_LIST = "SET_FILE_LIST",
  SET_REPOSITORIES_LIST = "SET_REPOSITORIES_LIST",
  SET_LAST_COMMIT = "SET_LAST_COMMIT",
  SET_DIFF = "SET_DIFF",
  SET_CURRENT_REPOSITORY = "SET_CURRENT_REPOSITORY",
  SET_CURRENT_BRANCH = "SET_CURRENT_BRANCH",
  DELETE_REPOSITORY = "DELETE_REPOSITORY",
  DOWNLOAD_REPOSITORY = "DOWNLOAD_REPOSITORY",
  SET_FILE_DATA = "SET_FILE_DATA",
  DELETE_ERROR = "DELETE_ERROR",
  ERROR_DOWNLOAD = "ERROR_DOWNLOAD",
}

export enum DeviceType {
  Mobile,
  Desktop,
}
export type Context = ActionContext<AppState, RootState>;

export interface IGetCommit {
  repo: string;
  hash: string;
  perPage: string;
}

export interface IDiff {
  repo: string;
  hash: string;
}

export interface IGetRepositoryData {
  repo: string;
  hash: string;
  path: string;
}

export interface FileListElem {
  name: string;
  meta: {
    hash: string;
    message: string;
    committer: string;
    date: string;
  };
}

export interface AppState {
  device: DeviceType;
  fileList: Array<FileListElem> | [];
  lastCommit: {
    hash: string;
    date: string;
  } | null;
  repositoryList: Array<string>;
  currentRepository: string;
  currentBranch: string;
  diff: string;
  error: string;
}
