import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_MAIN_SERVER,
  withCredentials: true,
});

export const SignAPI = {
  kakaoSign: (code) =>
    client.get(
      `/auth/kakao?code=${code}&redirect-uri=${process.env.REACT_APP_REDIRECT}`
    ),
  myinfo: () => client.get("/users/me"),
  updateInfo: (formData) => client.put("/users/me", formData),
  deleteInfo: () => client.delete("/users/me"),
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
