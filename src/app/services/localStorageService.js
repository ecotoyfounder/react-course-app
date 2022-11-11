const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const REGISTERED_KEY = "jwt=registered";
const USERID_KEY = "user-local-id";

export function setTokens({
  refreshToken,
  idToken,
  expiresIn = 3600,
  registered,
  localId,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
  localStorage.setItem(REGISTERED_KEY, registered);
  localStorage.setItem(USERID_KEY, localId);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(REGISTERED_KEY);
  localStorage.removeItem(USERID_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function getRegisteredToken() {
  return localStorage.getItem(REGISTERED_KEY);
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getRegisteredToken,
  getUserId,
  removeAuthData,
};

export default localStorageService;
