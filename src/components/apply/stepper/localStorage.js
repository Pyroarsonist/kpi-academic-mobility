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

export const uploadData = () => {
  let array = localStorage.getItem("list");
  if (array) {
    array = JSON.stringify(array);
  } else {
    array = [];
  }
  const data = getData(key);
  if (!data || Object.keys(data).length === 0) return;
  array.push(data);
  localStorage.setItem("list", JSON.stringify(array));
};

export const clearData = () => {
  localStorage.removeItem(key);
};
