import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_MAIN_SERVER,
  withCredentials: true,
});

export const SignAPI = {
  kakaoSign: (code) =>
    client.get(
      `/main/auth/kakao?code=${code}&redirect-uri=${process.env.REACT_APP_REDIRECT}`
    ),
  myinfo: () => client.get(`/main/users/me`),
  updateinfo: (formData) => client.put(`/main/users`, formData),
};

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response.status === 401) {
      return error;
    }
    return error;
  }
);
