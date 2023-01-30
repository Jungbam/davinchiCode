import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_MAIN_SERVER,
  withCredentials: true,
});

export const SignAPI = {
  kakaoSign: (code) =>
    client.post(
      `/auth/login/kakao?code=${code}&redirect-uri=${process.env.REACT_APP_REDIRECT}kakao`
    ),
  myinfo: () => client.get("/users/me"),
  updateInfo: (formData) => client.put("/users/me", formData),
  deleteInfo: (code) =>
    client.post(
      `/auth/unregister/kakao?code=${code}&redirect-uri=${process.env.REACT_APP_REDIRECT}kakaodel`
    ),
};
export const RoomAPI = {
  postRoom: (roomData) => client.post("/rooms", roomData),
};

// client.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error?.response.status === 401) {
//       return error;
//     }
//     return error;
//   }
// );
