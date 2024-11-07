import axios, { InternalAxiosRequestConfig } from 'axios';
import store from '../store';
import { refreshToken, signOut } from '../store/slices/auth.slice';

const API_URL = import.meta.env.VITE_URL;

const defaultOptions = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

const axiosClient = axios.create(defaultOptions);

axiosClient.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  const state = store.getState();
  const token = state.authState.token;
  if (config && config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    let tries = 0;
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      tries++;
      const state = store.getState();
      originalRequest._retry = true;
      const refresh_token = state.authState.refresh_token;
      const res = await axiosClient.post('auth/refresh_token', {
        refresh_token
      });
      const access_token = res.data.access_token;
      axios.defaults.headers.common.Authorization = 'Bearer ' + access_token;
      store.dispatch(
        refreshToken({
          token: res.data.token,
          refresh_token: res.data.refresh_token
        })
      );
      return axiosClient(originalRequest);
    }
    if (tries === 3) {
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
