import { User } from 'src/models/User';

type StorageAuthUserData = {
  token: string;
  user: {
    id: number;
    username: string;
    displayName: string;
  };
};

function createStorageAuthUserData(
  user: {
    id: number;
    username: string;
    displayName: string;
  },
  token: string,
): StorageAuthUserData {
  return {
    user: { ...user },
    token,
  };
}

const USER_INFO_KEY = process.env.USER_INFO_KEY ?? 'USER_INFO';

// Disable no-explicit-any rule for de type predicate
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isStorageAuthUserData(value: any): value is StorageAuthUserData {
  return (
    value !== null &&
    value !== undefined &&
    typeof value.token === 'string' &&
    value.user !== null &&
    value.user !== undefined &&
    typeof value.user === 'object' &&
    typeof value.user.id === 'number' &&
    typeof value.user.username === 'string' &&
    typeof value.user.displayName === 'string'
  );
}

function getAuthUser() {
  const authUserData = getAuthUserData();
  return authUserData !== null ? new User(authUserData.user) : null;
}

function getAuthToken() {
  return getAuthUserData()?.token ?? null;
}

function getAuthUserData() {
  const userDataStr = localStorage.getItem(USER_INFO_KEY);

  if (userDataStr === null) {
    return null;
  }

  const authUserDataFromStorage = JSON.parse(atob(userDataStr)) as StorageAuthUserData;

  return authUserDataFromStorage;
}

function storeAuthUserData(data: StorageAuthUserData | null) {
  if (data === null) {
    clearAuthUserData();
    return;
  }

  // Ensures that the stored data is a plain object
  const userData: StorageAuthUserData = {
    token: data.token,
    user: {
      id: data.user.id,
      username: data.user.username,
      displayName: data.user.displayName,
    },
  };

  const userDataStr = btoa(JSON.stringify(userData));
  localStorage.setItem(USER_INFO_KEY, userDataStr);
}

function isUserAuthenticated() {
  const authUserDataFromStorage = getAuthUserData();

  return isStorageAuthUserData(authUserDataFromStorage);
}

function clearAuthUserData() {
  localStorage.removeItem(USER_INFO_KEY);
}

export {
  createStorageAuthUserData,
  getAuthUser,
  getAuthToken,
  getAuthUserData,
  isUserAuthenticated,
  storeAuthUserData,
  clearAuthUserData,
  isStorageAuthUserData,
  USER_INFO_KEY,
};
export type { StorageAuthUserData };
