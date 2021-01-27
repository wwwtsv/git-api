import { DateTime } from "luxon";
import { Action, ActionContext, ActionTree, Module, MutationTree } from "vuex";
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
  LastCommit,
  AppStateActions,
} from "./types/app-state";
import { RootState } from "@app/store";
import { fileCompare } from "@app/helpers";

const appAppState: Module<AppState, RootState> = {
  namespaced: true,
  state: (): AppState => ({
    device: DeviceType.Desktop,
    isLoading: false,
    fileList: [],
    fileData: { fileName: "", rows: 0, content: "" },
    lastCommit: {
      hash: "",
      date: "",
      committer: "",
    },
    lastPath: "",
    branchList: [],
    repositoryList: [],
    currentRepository: "",
    currentBranch: "",
    diff: "",
    breadcrumbs: [],
    error: "",
  }),
  mutations: {
    SET_DEVICE: (state: AppState, payload: DeviceType): void => {
      state.device = payload;
    },
    SET_FILE_LIST: (state: AppState, payload: Array<FileListElem>): void => {
      state.fileList = payload;
    },
    SET_FILE_DATA: (state: AppState, payload: { fileName: string; rows: number; content: string }): void => {
      state.fileData = payload;
    },
    SET_REPOSITORIES_LIST: (state: AppState, payload: Array<string>): void => {
      state.repositoryList = payload;
    },
    SET_BRANCH_LIST: (state: AppState, payload: Array<{ name: string; time: string }>): void => {
      state.branchList = payload;
    },
    SET_LAST_COMMIT: (state: AppState, payload: { hash: string; date: string; committer: string }): void => {
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
    SET_BREADCRUMBS: (state: AppState, payload: Array<string>): void => {
      state.breadcrumbs = payload;
    },
    SET_LAST_PATH: (state: AppState, payload: string): void => {
      state.lastPath = payload;
    },
  } as MutationTree<AppState>,
  actions: {
    GetRepositoryList: ({ commit, state }: ActionContext<AppState, RootState>): Promise<void> => {
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
    SetCurrentRepository: ({ commit }: ActionContext<AppState, RootState>, payload: string): void => {
      commit(MutationTypes.SET_CURRENT_REPOSITORY, payload);
    },
    GetBranchList: (
      { commit, state }: ActionContext<AppState, RootState>,
      { repo, allBranches }: { repo: string; allBranches?: boolean }
    ): Promise<void> => {
      if (!state.isLoading) {
        commit(MutationTypes.SET_LOADING, true);
        return getBranchList(repo, allBranches).then(
          (result) => {
            commit(MutationTypes.SET_CURRENT_BRANCH, result.data[0].name);
            if (allBranches) {
              commit(MutationTypes.SET_BRANCH_LIST, result.data);
            }
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
    SetCurrentBranch({ commit, state }: ActionContext<AppState, RootState>, { branch }: { branch: string }): void {
      const branchList = state.branchList;
      const currentBranch = branchList.find((currentBranch) => currentBranch.name === branch);

      if (currentBranch) {
        commit(MutationTypes.SET_CURRENT_BRANCH, currentBranch.name);
        const newBranchList = branchList.filter((filteredBranch) => filteredBranch.name !== currentBranch.name);
        commit(MutationTypes.SET_BRANCH_LIST, [currentBranch, ...newBranchList]);
      }
    },
    GetCommitList: (
      { commit, state }: ActionContext<AppState, RootState>,
      { repo, hash, perPage }: IGetCommit
    ): Promise<void> => {
      if (!state.isLoading) {
        commit(MutationTypes.SET_LOADING, true);
        return getCommitList(repo, hash, perPage).then(
          (commits) => {
            const lastCommit = JSON.parse(commits.data)[0];

            const { hash, date, committer } = lastCommit as LastCommit;
            const formattedLastCommit = {
              hash: hash.substring(0, 6),
              date: DateTime.fromJSDate(new Date(date)).toFormat("dd MMM yyyy, T"),
              committer: committer,
            };
            commit(MutationTypes.SET_LAST_COMMIT, formattedLastCommit);
            commit(MutationTypes.SET_LOADING, false);
          },
          (reason) => {
            commit(MutationTypes.SET_ERROR, `${reason}`);
            commit(MutationTypes.SET_LOADING, false);
          }
        );
      } else {
        return Promise.reject("Failed get commit list");
      }
    },
    GetFileList: (
      { commit, state }: ActionContext<AppState, RootState>,
      { repo, hash, path }: IGetRepositoryData
    ): Promise<void> => {
      if (!state.isLoading) {
        commit(MutationTypes.SET_LOADING, true);
        return getFileList(repo, hash, path).then(
          (commitList) => {
            const formattedData = commitList.data
              .map((file) => {
                const { hash, message, committer, date } = JSON.parse(file.meta);
                const resolveNameKey = file.name.includes(".") ? "file" : "folder";
                return {
                  [resolveNameKey]: file.name,
                  hash,
                  message,
                  committer,
                  date: DateTime.fromJSDate(new Date(date)).toLocaleString({
                    ...{ locale: "en" },
                    ...DateTime.DATE_MED_WITH_WEEKDAY,
                  }),
                };
              })
              .sort(fileCompare);
            commit(MutationTypes.SET_FILE_LIST, formattedData);
            commit(MutationTypes.SET_LOADING, false);
          },
          (reason) => {
            commit(MutationTypes.SET_ERROR, `${reason}`);
            commit(MutationTypes.SET_LOADING, false);
          }
        );
      } else {
        return Promise.reject("Failed get file list");
      }
    },
    GetFileData: async (
      { commit, state }: ActionContext<AppState, RootState>,
      { repo, hash, path, name }: { repo: string; hash: string; path: Array<string>; name: string }
    ): Promise<void> => {
      if (!state.isLoading) {
        commit(MutationTypes.SET_LOADING, true);
        return getFileData(repo, hash, path).then(
          (fileData) => {
            const lines = fileData.data.split("\n");
            const formattedData = {
              fileName: name,
              rows: lines.length,
              content: fileData.data,
            };

            commit(MutationTypes.SET_FILE_DATA, formattedData);
            commit(MutationTypes.SET_LOADING, false);
          },
          (reason) => {
            commit(MutationTypes.SET_ERROR, `${reason}`);
            commit(MutationTypes.SET_LOADING, false);
          }
        );
      }
    },
    SetBreadcrumbs: ({ commit }: ActionContext<AppState, RootState>, payload: Array<string>): void => {
      commit(MutationTypes.SET_BREADCRUMBS, payload);
    },
    SetLastPath: ({ commit }: ActionContext<AppState, RootState>, payload: string): void => {
      commit(MutationTypes.SET_LAST_PATH, payload);
    },
    InitRootData: async ({ commit, state, dispatch }: ActionContext<AppState, RootState>): Promise<void> => {
      await dispatch("GetRepositoryList");
      const currentRepository = state.currentRepository;
      await dispatch("GetCommitList", { repo: currentRepository, hash: "master", perPage: "1" });
      await dispatch("GetBranchList", { repo: currentRepository });
    },

    // GetDiff: async ({ commit }: Context, { repo, hash }: IDiff): Promise<void> => {
    //   const diff = await getDiff(repo, hash);
    //   commit(MutationTypes.SET_DIFF, diff);
    // },
    // DeleteRepository: async ({ state, commit }: Context, repo: string): Promise<void> => {
    //   const deleteRepo = await deleteRepository(repo);
    //   if (deleteRepo) {
    //     const newRepoList = state.repositoryList.filter((currentRepo) => currentRepo !== repo);
    //     commit(MutationTypes.DELETE_REPOSITORY, newRepoList);
    //   } else {
    //     commit(MutationTypes.DELETE_ERROR, `${deleteRepository}`);
    //   }
    // },
    // DownloadRepository: async ({ state, commit }: Context, repo: string): Promise<void> => {
    //   const downloadRepo = await downloadRepository(repo);
    //   if (downloadRepo) {
    //     const newRepoList = [...state.repositoryList, repo];
    //     commit(MutationTypes.DOWNLOAD_REPOSITORY, newRepoList);
    //   } else {
    //     commit(MutationTypes.ERROR_DOWNLOAD, `${downloadRepository}`);
    //   }
    // },
  } as ActionTree<AppState, RootState>,
};

export default appAppState;
