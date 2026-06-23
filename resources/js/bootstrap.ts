// Standard app bootstrap entrypoint.
// This file exists to satisfy the side-effect import in resources/js/app.tsx.
// Add any shared runtime setup here if needed.
import axios, { AxiosInstance } from 'axios';

declare global {
  interface Window {
    axios: AxiosInstance;
  }
}


window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';