export const getSessionStorageItem = key => {
  const value = sessionStorage.getItem(key);

  return value ? JSON.parse(value) : [];
};

export const setSessionStorageItem = (key, value) => {
  sessionStorage.removeItem(key);
  sessionStorage.setItem(key, JSON.stringify(value));
};
