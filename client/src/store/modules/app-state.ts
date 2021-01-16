import { ActionTree, Module, MutationTree } from "vuex";
import {
  getCommitList,
  getDiff,
  getFileData,
  getFileList,
  getRepositoryList,
  deleteRepository,
  downloadRepository,
  getBranchList,
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

const appAppState: Module<AppState, AppState> = {
  namespaced: true,
  state: (): AppState => ({
    device: DeviceType.Desktop,
    isLoading: false,
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
    SET_LOADING: (state: AppState, payload: boolean): void => {
      state.isLoading = payload;
    },
    SET_ERROR: (state: AppState, payload: string): void => {
      state.error = payload;
    },
  } as MutationTree<AppState>,
  actions: {
    GetRepositoryList: ({ commit, state }: Context): Promise<void> => {
      if (!state.isLoading) {
        commit(MutationTypes.SET_LOADING, true);
        return getRepositoryList().then(
          (result) => {
            commit(MutationTypes.SET_REPOSITORIES_LIST, result.data);
            commit(MutationTypes.SET_CURRENT_REPOSITORY, result.data[0]);
            commit(MutationTypes.SET_LOADING, false);
          },
          (reason) => {
            commit(MutationTypes.SET_ERROR, `${reason}`);
            commit(MutationTypes.SET_LOADING, false);
          }
        );
      } else {
        return Promise.reject("Failed get repo list");
      }
    },
    GetBranchList: ({ commit, state }: Context, repo: string, allBranches?: boolean): Promise<void> => {
      if (!state.isLoading) {
        commit(MutationTypes.SET_LOADING, true);
        return getBranchList(repo, allBranches).then(
          (result) => {
            commit(MutationTypes.SET_CURRENT_BRANCH, result.data[0].name);
            commit(MutationTypes.SET_LOADING, false);
          },
          (reason) => {
            commit(MutationTypes.SET_ERROR, `${reason}`);
            commit(MutationTypes.SET_LOADING, false);
          }
        );
      } else {
        return Promise.reject("Failed get branch list");
      }
    },
    /*GetCommitList: async ({ commit }: Context, { repo, hash, perPage }: IGetCommit): Promise<void> => {
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
    },*/
  } as ActionTree<AppState, AppState>,
};

export default appAppState;
