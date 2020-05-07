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

export const uploadData = async () => {
  let array = await fetch(baseUrl).then((x) => x.text());
  if (array) {
    try {
      array = JSON.parse(array);
    } catch (e) {
      console.error(e);
      array = [];
    }
  } else {
    array = [];
  }
  const data = getData(key);
  if (!data || Object.keys(data).length === 0) return;
  array.push(data);
  await fetch(baseUrl, { method: "post", body: JSON.stringify(array) });
};

export const clearData = () => {
  localStorage.removeItem(key);
};
