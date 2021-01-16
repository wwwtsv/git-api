import { ActionContext } from "vuex";

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
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

export enum AppStateActions {
  GetRepositoryList = "appState/GetRepositoryList",
  GetBranchList = "appState/GetBranchList",
  GetCommitList = "appState/GetCommitList",
  GetDiff = "appState/GetDiff",
  GetFileList = "appState/GetFileList",
  GetFileData = "appState/GetFileData",
  DeleteRepository = "appState/DeleteRepository",
  DownloadRepository = "appState/DownloadRepository",
}

export enum DeviceType {
  Mobile,
  Desktop,
}
export type Context = ActionContext<AppState, AppState>;

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
  isLoading: boolean;
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
