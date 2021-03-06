import { ActionContext } from "vuex";

export const enum MutationTypes {
  SET_DEVICE = "SET_DEVICE",
  SET_FILE_LIST = "SET_FILE_LIST",
  SET_REPOSITORIES_LIST = "SET_REPOSITORIES_LIST",
  SET_LAST_COMMIT = "SET_LAST_COMMIT",
  SET_COMMIT_LIST = "SET_COMMIT_LIST",
  SET_DIFF = "SET_DIFF",
  SET_CURRENT_REPOSITORY = "SET_CURRENT_REPOSITORY",
  SET_CURRENT_BRANCH = "SET_CURRENT_BRANCH",
  SET_BRANCH_LIST = "SET_BRANCH_LIST",
  SET_FILE_DATA = "SET_FILE_DATA",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_BREADCRUMBS = "SET_BREADCRUMBS",
  SET_LAST_PATH = "SET_LAST_PATH",
}

export enum AppStateActions {
  SetDeviceType = "appState/SetDeviceType",
  GetRepositoryList = "appState/GetRepositoryList",
  SetCurrentRepository = "appState/SetCurrentRepository",
  GetBranchList = "appState/GetBranchList",
  SetCurrentBranch = "appState/SetCurrentBranch",
  GetCommitList = "appState/GetCommitList",
  GetFileList = "appState/GetFileList",
  GetDiff = "appState/GetDiff",
  GetFileData = "appState/GetFileData",
  SetBreadcrumbs = "appState/SetBreadcrumbs",
  SetLastPath = "appState/SetLastPath",
  InitRootData = "appState/InitRootData",
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
  path: Array<string>;
}

export interface FileListElem {
  name: string;
  hash: string;
  message: string;
  committer: string;
  date: string;
}

export interface BranchListElem {
  name: string;
  time: string;
}

export interface Commit {
  hash: string;
  date: string;
  committer: string;
  message: string;
}

export interface ExtendedCommit extends Commit {
  title: string;
  fullHash: string;
  relativeTime: string;
}

export interface AppState {
  device: DeviceType;
  fileList: Array<FileListElem> | [];
  fileData: { fileName: string; rows: number; content: string };
  isLoading: boolean;
  lastCommit: Commit | null;
  lastPath: string;
  commitList: Array<Commit>;
  repositoryList: Array<string>;
  branchList: Array<BranchListElem>;
  currentRepository: string;
  currentBranch: string;
  diff: string;
  breadcrumbs: Array<string>;
  error: string;
}
