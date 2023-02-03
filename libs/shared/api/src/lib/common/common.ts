import Axios from 'axios';
import {
  clearAuthTokens,
  getAuthTokens,
  initAuth,
  startAuthTokenRefreshProcess,
} from './auth';
import { getErrorMessageFromResponse } from './response';
import { refreshAuthToken } from './authentication';

//
// CONSTANTS
//
const CLIENT_API_BASE = process.env['NEXT_PUBLIC_CLIENT_API_BASE'] + '/v1/';

//
// INSTANCE
//
export const publicApiInstance = Axios.create({ baseURL: CLIENT_API_BASE });
export const clientApiInstance = Axios.create({
  baseURL: CLIENT_API_BASE,
});

initAuth(clientApiInstance, refreshAuthToken);

//
// INTERCEPTORS
//

clientApiInstance.interceptors.response.use(
  (data) => data,
  async (error) => {
    error.message = getErrorMessageFromResponse(error);

    if (
      error.response?.status === 401 &&
      !!getAuthTokens() &&
      error.config.url !== '/auth/token/refresh/'
    ) {
      try {
        await startAuthTokenRefreshProcess(
          clientApiInstance,
          refreshAuthToken,
          true
        );

        if (!error.config) {
          return;
        }

        // resend the request with same config but new token, if token refresh successful
        const newConfig = {
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: 'Bearer ' + getAuthTokens()?.access_token,
          },
        };
        return await clientApiInstance.request(newConfig);
      } catch (err) {
        clearAuthTokens(clientApiInstance);
        error.message = 'Your session has expired please login again.';
      }
    }

    throw error;
  }
);

publicApiInstance.interceptors.response.use(
  (data) => data,
  async (error) => {
    error.message = getErrorMessageFromResponse(error);

    throw error;
  }
);

//
// COMMON TYPES
//

//
// COMMON UTILS
//
