import { Module } from "vuex";
import {
  getCommitList,
  getDiff,
  getFileData,
  getFileList,
  getRepositoryList,
  deleteRepository,
  downloadRepository,
} from "@app/api/git";
import {
  MutationTypes,
  FileListElem,
  Context,
  DeviceType,
  IGetCommit,
  IDiff,
  IGetRepositoryData,
  AppState,
} from "@app/store/modules/types/app-state";
import { RootState } from "@app/store";

const appAppState: Module<AppState, RootState> = {
  state: (): AppState => ({
    device: DeviceType.Desktop,
    fileList: [],
    lastCommit: null,
    repositoryList: [],
    currentRepository: "",
    currentBranch: "",
    diff: "",
    error: "",
  }),
  mutations: {
    SET_DEVICE: (state: AppState, payload: DeviceType): void => {
      state.device = payload;
    },
    SET_FILE_LIST: (state: AppState, payload: Array<FileListElem>): void => {
      state.fileList = payload;
    },
    SET_REPOSITORIES_LIST: (state: AppState, payload: Array<string>): void => {
      state.repositoryList = payload;
    },
    SET_LAST_COMMIT: (state: AppState, payload: { hash: string; date: string }): void => {
      state.lastCommit = payload;
    },
    SET_DIFF: (state: AppState, payload: string): void => {
      state.diff = payload;
    },
    SET_CURRENT_REPOSITORY: (state: AppState, payload: string): void => {
      state.currentRepository = payload;
    },
    SET_CURRENT_BRANCH: (state: AppState, payload: string): void => {
      state.currentBranch = payload;
    },
    DELETE_REPOSITORY: (state: AppState, payload: Array<string>): void => {
      state.repositoryList = payload;
    },
    DOWNLOAD_REPOSITORY: (state: AppState, payload: Array<string>): void => {
      state.repositoryList = payload;
    },
  },
  actions: {
    GetRepositoryList: async ({ commit }: Context): Promise<void> => {
      const repoList = await getRepositoryList();
      commit(MutationTypes.SET_REPOSITORIES_LIST, repoList);
    },
    GetCommitList: async ({ commit }: Context, { repo, hash, perPage }: IGetCommit): Promise<void> => {
      const commitList = await getCommitList(repo, hash, perPage);
      // @ts-ignore
      const lastCommit = JSON.parse(commitList)[0];
      commit(MutationTypes.SET_LAST_COMMIT, lastCommit);
    },
    GetDiff: async ({ commit }: Context, { repo, hash }: IDiff): Promise<void> => {
      const diff = await getDiff(repo, hash);
      commit(MutationTypes.SET_DIFF, diff);
    },
    GetFileList: async ({ commit }: Context, { repo, hash, path }: IGetRepositoryData): Promise<void> => {
      const fileList = await getFileList(repo, hash, path);
      commit(MutationTypes.SET_FILE_LIST, fileList);
    },
    GetFileData: async ({ commit }: Context, { repo, hash, path }: IGetRepositoryData): Promise<void> => {
      const fileData = await getFileData(repo, hash, path);
      commit(MutationTypes.SET_FILE_DATA, fileData);
    },
    DeleteRepository: async ({ state, commit }: Context, repo: string): Promise<void> => {
      const deleteRepo = await deleteRepository(repo);
      if (deleteRepo) {
        const newRepoList = state.repositoryList.filter((currentRepo) => currentRepo !== repo);
        commit(MutationTypes.DELETE_REPOSITORY, newRepoList);
      } else {
        commit(MutationTypes.DELETE_ERROR, `${deleteRepository}`);
      }
    },
    DownloadRepository: async ({ state, commit }: Context, repo: string): Promise<void> => {
      const downloadRepo = await downloadRepository(repo);
      if (downloadRepo) {
        const newRepoList = [...state.repositoryList, repo];
        commit(MutationTypes.DOWNLOAD_REPOSITORY, newRepoList);
      } else {
        commit(MutationTypes.ERROR_DOWNLOAD, `${downloadRepository}`);
      }
    },
  },
};

export default appAppState;
