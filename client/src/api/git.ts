import request from "@app/api/utils/request";

export const getRepositoryList = () => request({
  url: '/',
  method: 'get'
})

export const getCommitList = (repo: string, hash: string, perPage: string) => request({
  url: `/${repo}/commits/${hash}`,
  method: 'get',
  params: {
    perPage
  }
})

export const getDiff = (repo: string, hash: string) => request({
  url: `/${repo}/commits/${hash}/diff`
})

export const getFileList = (repo: string, hash: string, path: string) => request({
  url: `/${repo}/${hash}/${path}`,
  method: 'get'
})

export const getFileData = (repo: string, hash: string, path: string) => request({
  url: `/${repo}/blob/${hash}/${path}`,
  method: 'get'
})

export const deleteRepository = (repo: string) => request({
  url: `/${repo}`,
  method: 'delete'
})

export const downloadRepository = (url: string) => request({
  url: `/`,
  method: 'post',
  data: {
    repoUrl: url
  }
})
