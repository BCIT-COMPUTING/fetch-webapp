import axios from "axios";

const user = localStorage.getItem("user") ?? "";
let TOKEN = JSON.parse(user)?.user?.accessToken;

export const endPointBaseUrl = "https://fetch-be.azurewebsites.net";
// export const endPointBaseUrl = "http://localhost:8080/api/v1";

export const publicRequest = axios.create({
  baseURL: endPointBaseUrl,
});

const userReq = axios.create({
  baseURL: endPointBaseUrl,
  headers: { token: `Bearer ${TOKEN}` },
});
export const userRequest = userReq;
