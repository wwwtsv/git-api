import request from "@app/api/utils/request";

export const getFileList = (repo: string, hash: string, path: string) => request({
  url: `${repo}/${hash}/${path}`,
  method: 'get'
})
