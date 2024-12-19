import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/axios";

const useAuthAxios = () => {
  const { accessToken, checkAuth } = useAuth();

  axios.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const result = await checkAuth();

          if (!result) throw new Error("Error on refreshing token");

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${result.accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Unable to refresh token:", refreshError);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return axios;
};

export default useAuthAxios;
