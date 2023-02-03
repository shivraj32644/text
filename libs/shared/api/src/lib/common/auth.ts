import { AxiosInstance } from 'axios';

export interface AuthTokenDetails {
  access_token: string;
  access_exp_at: number;
  refresh_token: string;
  refresh_exp_at: number;
}

export function getAuthTokens() {
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');
  const refresh_exp_at = localStorage.getItem('refresh_exp_at');
  const access_exp_at = localStorage.getItem('access_exp_at');

  if (!access_token || !refresh_token || !refresh_exp_at || !access_exp_at) {
    return null;
  }

  return { access_token, refresh_token, refresh_exp_at, access_exp_at };
}

export function setAuthTokens(
  data: AuthTokenDetails,
  apiInstance: AxiosInstance
) {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('refresh_exp_at', data.refresh_exp_at.toString());
  localStorage.setItem('access_exp_at', data.access_exp_at.toString());

  apiInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + data.access_token;
}

export function clearAuthTokens(apiInstance: AxiosInstance) {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('refresh_exp_at');
  localStorage.removeItem('access_exp_at');

  delete apiInstance.defaults.headers.common['Authorization'];
}

export async function refreshAuthTokenIfNeeded(
  apiInstance: AxiosInstance,
  refreshAuthToken: () => Promise<AuthTokenDetails>,
  force = false,
  graceMinutes = 5
) {
  // console.info('Checking if auth token refresh needed!');

  const storedAuthToken = localStorage.getItem('access_token');
  const accessExpAt = localStorage.getItem('access_exp_at');

  if (!storedAuthToken || !accessExpAt) {
    console.error('No stored auth token found, not refreshing');
    throw new Error('You are not authenticated! Please login.');
  }

  const exp = +accessExpAt;
  let expiresInMS = +new Date(exp * 1000) - Date.now();

  const graceMs = graceMinutes * 60 * 1000;

  // if token expires within a minute, refresh it
  if (expiresInMS <= graceMs || force) {
    try {
      // console.info('Refreshing auth token!');
      const { access_exp_at } = await refreshAuthToken();
      expiresInMS = +new Date(access_exp_at * 1000) - Date.now();
    } catch (err: any) {
      clearAuthTokens(apiInstance);
      throw err;
    }
  }

  return { expiresInMS, graceMs };
}

let refreshTokenTimeouReference: number | null = null;
const MAX_REFRESH_TIMEOUT_MS = 1000 * 60 * 60 * 24; // 1 day
export async function startAuthTokenRefreshProcess(
  apiInstance: AxiosInstance,
  refreshAuthToken: () => Promise<AuthTokenDetails>,
  force = false,
  graceMinutes = 5
) {
  // clear any previous timeout
  if (refreshTokenTimeouReference) {
    window.clearTimeout(refreshTokenTimeouReference);
    refreshTokenTimeouReference = null;
  }

  const { expiresInMS, graceMs } = await refreshAuthTokenIfNeeded(
    apiInstance,
    refreshAuthToken,
    force,
    graceMinutes
  );

  // set timeout to refresh token half a minute before it's expiry
  let timeoutDelay = Math.max(expiresInMS - graceMs, 240000); // timeout interval not less than 60 seconds
  if (timeoutDelay > MAX_REFRESH_TIMEOUT_MS) {
    timeoutDelay = MAX_REFRESH_TIMEOUT_MS;
  }

  refreshTokenTimeouReference = window.setTimeout(
    () =>
      startAuthTokenRefreshProcess(apiInstance, refreshAuthToken, true).catch(
        (e) => {
          console.error(e);
        }
      ),
    timeoutDelay
  );
}

export function initAuth(
  apiInstance: AxiosInstance,
  refreshAuthToken: () => Promise<AuthTokenDetails>
) {
  if (typeof window === 'undefined') return;

  const access_token = localStorage.getItem('access_token');
  if (!access_token) return;

  apiInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + access_token;

  startAuthTokenRefreshProcess(apiInstance, refreshAuthToken).catch(() => null);
}
