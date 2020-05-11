import { baseUrl } from "../../../kvdb";

const key = "tempData";

const getData = () => {
  const str = localStorage.getItem(key);
  if (!str) return null;
  return JSON.parse(str);
};

export const initData = () => {
  let temp = localStorage.getItem(key);
  if (!temp) {
    temp = {};
    localStorage.setItem(key, JSON.stringify(temp));
  }
};

export const mergeData = (data) => {
  const oldData = getData(key);
  localStorage.setItem(
    key,
    JSON.stringify({
      ...oldData,
      ...data,
    })
  );
};

export const getDataFromDatabase = async () => {
  try {
    const text = await fetch(baseUrl, {
      cache: "no-cache",
    }).then((x) => x.text());
    const arr = JSON.parse(text);
    return arr;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const uploadData = async () => {
  const data = getData(key);
  if (!data || Object.keys(data).length === 0) return;
  const array = await getDataFromDatabase();
  array.unshift(data);
  await fetch(baseUrl, { method: "post", body: JSON.stringify(array) });
};

export const clearData = () => {
  localStorage.removeItem(key);
};
