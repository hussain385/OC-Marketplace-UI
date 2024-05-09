export const { parse, stringify } = JSON;

// cache singlevalue

function setCache<T>(key: string, value: T) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function dispatchCache(key: string) {
  return localStorage.getItem(key) ?? '';
}

function removeCache(key: string) {
  return localStorage.removeItem(key);
}

// cache multiple value

function setCacheData<T extends { id: string; value: unknown }>(arr: T[]) {
  arr.map((list: T) => {
    const value = list.value;
    if (typeof value === 'string') {
      localStorage.setItem(list.id, JSON.stringify(value));
    }
    if (typeof value === 'boolean') {
      localStorage.setItem(list.id, JSON.stringify(value));
    } else if (typeof value === 'number') {
      localStorage.setItem(list.id, JSON.stringify(value));
    } else if (typeof value === 'object') {
      localStorage.setItem(list.id, JSON.stringify(value));
    }
  });
}

function dispatchCacheData<T extends string>(arr: T[]) {
  return arr.map((list: T) => (list && localStorage.getItem(list)) ?? '');
}

function unmountCacheData() {
  return Object.keys(localStorage).map((list) => localStorage.removeItem(list));
}

function removeItemCachewithExcludedKey<T extends string>(exclude: Array<T>) {
  const arr = Object.keys(localStorage);

  exclude.map((value: T) => {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
  });

  arr.map(localStorage.removeItem);

  return arr;
}

function removeItemCachewithIncludedKey<T extends string>(include: Array<T>) {
  return include.map((val: T) => localStorage.removeItem(val));
}

export {
  setCache,
  setCacheData,
  dispatchCache,
  removeCache,
  dispatchCacheData,
  unmountCacheData,
  removeItemCachewithExcludedKey,
  removeItemCachewithIncludedKey,
};
