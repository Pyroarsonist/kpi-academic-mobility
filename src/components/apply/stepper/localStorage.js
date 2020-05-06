const key = "tempData";

export const initData = () => {
  let temp = localStorage.getItem("tempData");
  if (!temp) {
    temp = {};
    localStorage.setItem(key, JSON.stringify(temp));
  }
};

export const mergeData = (data) => {
  const old = localStorage.getItem(key);
  const oldData = JSON.parse(old);
  localStorage.setItem(
    key,
    JSON.stringify({
      ...oldData,
      ...data,
    })
  );
};

export const clearData = () => {
  localStorage.removeItem(key);
};
