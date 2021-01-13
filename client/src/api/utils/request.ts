import axios from "axios";

const service = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
});

export default service;
