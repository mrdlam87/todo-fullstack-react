import axios from "axios";

const cacheMap = new Map();

const get = async (url) => {
  const cacheResponse = cacheMap.get(url);

  if (cacheResponse) return cacheResponse;

  const response = await axios.get(url);

  cacheMap.set(url, response);

  return response;
};

const post = async (url, payload) => {
  clearCache(url);

  return await axios.post(url, payload);
};

const put = async (url, payload) => {
  clearCache(url);

  return await axios.put(url, payload);
};

const patch = async (url, payload) => {
  clearCache(url);

  return await axios.patch(url, payload);
};

const del = async (url) => {
  clearCache(url);

  return await axios.delete(url);
};

const clearCache = (url) => {
  const matches = url.match(/\/api\/([^/]+)/);

  if (matches) {
    const firstWord = matches[1];

    cacheMap.forEach(
      (_, key) => getRegex(firstWord).test(key) && cacheMap.delete(key)
    );
  }
};

const getRegex = (baseWord) => new RegExp(`.*\\/api\\/${baseWord}($|\\/).*`);

const smartHttp = {
  get,
  post,
  put,
  patch,
  del,
};

export default smartHttp;
