enum DeviceType {
  Mobile,
  Desktop
}

interface FileListElem {
  name: string,
  meta: {
    hash: string,
    message: string,
    committer: string,
    date: string,
  }
}

interface State {
  device: DeviceType;
  fileList: Array<FileListElem> | [];
  lastCommit: {
    hash: string,
    date: string
  } | null;
  currentRepository: string;
  currentBranch: string;
  diff: string;
}

export interface AppState {
  state: () => State,
  mutations: {
    SET_DEVICE: (state: State, payload: DeviceType) => void,
    SET_FILE_LIST: (state: State, payload: Array<FileListElem>) => void,
    SET_LAST_COMMIT: (state: State, payload: { hash: string, date: string }) => void,
    SET_CURRENT_REPOSITORY: (state: State, payload: string) => void,
    SET_CURRENT_BRANCH: (state: State, payload: unknown) => void,
    DELETE_REPOSITORY: (state: State, payload: unknown) => void,
    DOWNLOAD_REPOSITORY: (state: State, payload: unknown) => void,
  }
  actions: {
    GetRepositoryList: () => void;
    GetCommitList: () => void;
    GetDiff: () => void;
    GetFileList: () => void;
    GetFileData: () => void;
    DeleteRepository: () => void;
    DownloadRepository: () => void;
  };
}

const appState: AppState = {
  state: () => ({
    device: DeviceType.Desktop,
    fileList: [],
    lastCommit: null,
    currentRepository: '',
    currentBranch: '',
    diff: '',
  }),
  mutations: {
    SET_DEVICE: (state: State, payload: DeviceType): void => {
      state.device = payload
    },
    SET_FILE_LIST: (state: State, payload: Array<FileListElem>): void => {
      state.fileList = payload
    },
    SET_LAST_COMMIT: (state: State, payload: { hash: string, date: string }): void => {
      state.lastCommit = payload;
    },
    SET_CURRENT_REPOSITORY: (state: State, payload: string): void => {
      state.currentRepository = payload;
    },
    SET_CURRENT_BRANCH: (): void => {},
  },
  actions: {
    GetRepositoryList: () => {},
    GetCommitList: () => {},
    GetDiff: () => {},
    GetFileList: () => {},
    GetFileData: () => {},
    DeleteRepository: () => {},
    DownloadRepository: () => {},
  },
}

export default appState;

