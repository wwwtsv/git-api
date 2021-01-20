export const fileCompare = (a: any, b: any): number => {
  if (a.folder && b.folder) {
    return a.folder.localeCompare(b.folder);
  }
  if (a.file && b.file) {
    return a.file.localeCompare(b.file);
  }
  if (a.file && b.folder) {
    return 1;
  } else {
    return -1;
  }
};
