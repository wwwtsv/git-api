enum DeviceType {
  Mobile,
  Desktop
}

export interface AppState {
  state: () => ({
    device: DeviceType;
    fileList: [];
    currentRepository: string;
    currentBranch: string;
  })
}

const appState: AppState = {
  state: () => ({
    device: DeviceType.Desktop,
    fileList: [],
    currentRepository: '',
    currentBranch: '',
  }),
}

export default appState;

