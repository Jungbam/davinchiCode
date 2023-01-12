import { Cookies } from "react-cookie";
import axios from "axios";
const cookie = new Cookies();

export const client = axios.create({
  baseURL: process.env.REACT_APP_MAIN_SERVER,
  withCredentials: true,
});

export const SignAPI = {
  kakaoSign: (code) => client.get(`/main/auth/kakao?code=${code}`),
  myinfo: () => client.get(`/main/users/me`),
};

client.interceptors.request.use(
  function (config) {
    if (cookie.get("accessToken")) {
      config.headers.authorization = `Bearer ${cookie.get("accessToken")}`;
    }
    return config;
  },
  function (error) {
    return error;
  }
);

client.interceptors.response.use(
  function (response) {
    if (response.data.accessToken) {
      cookie.set("accessToken", response.data.token, { path: "/" });
    }
    return response;
  },
  function (error) {
    if (error?.response.status === 401) {
      cookie.remove("accessToken", { path: "/" });
      return error;
    }
    return error;
  }
);
