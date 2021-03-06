import request from "@app/api/utils/request";
import { AxiosPromise } from "axios";

type RepoList = AxiosPromise<Array<string>>;
type BranchList = AxiosPromise<Array<{ name: string; time: string }>>;
type CommitList = AxiosPromise<string>;
type Diff = AxiosPromise<string>;
type FileList = AxiosPromise<
  Array<{
    name: string;
    meta: string;
  }>
>;
type FileData = AxiosPromise<string>;
type DeleteInfo = AxiosPromise<string>;
type DownloadInfo = AxiosPromise<string>;

export const getRepositoryList = (): RepoList =>
  request({
    url: "",
    method: "get",
  });

export const getBranchList = (repo: string, all?: boolean): BranchList =>
  request({
    url: `${repo}/branch${all ? "?all=true" : ""}`,
    method: "get",
  });

export const getCommitList = (repo: string, hash: string, perPage: string): CommitList =>
  request({
    url: `/${repo}/commits/${hash}`,
    method: "get",
    params: {
      perPage,
    },
  });

export const getDiff = (repo: string, hash: string): Diff =>
  request({
    url: `/${repo}/commits/${hash}/diff`,
  });

export const getFileList = (repo: string, hash: string, path: Array<string>): FileList => {
  const resolvePath = path ? path.join("/") : path;
  return request({
    url: [repo, "tree", hash, resolvePath].filter(Boolean).join("/"),
    method: "get",
  });
};

export const getFileData = (repo: string, hash: string, path: Array<string>): FileData =>
  request({
    url: `/${repo}/blob/${hash}/${path.join("/")}`,
    method: "get",
  });

export const deleteRepository = (repo: string): DeleteInfo =>
  request({
    url: `/${repo}`,
    method: "delete",
  });

export const downloadRepository = (url: string): DownloadInfo =>
  request({
    url: `/`,
    method: "post",
    data: {
      repoUrl: url,
    },
  });
