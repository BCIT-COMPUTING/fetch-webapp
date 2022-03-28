import axios from "axios";
import { getStorageValue } from "./store/localStorageHook";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmVkZmExYzhkOWVmMGUyYmM1NDdjOSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDcyMzk3MzIsImV4cCI6MTY0NzQ5ODkzMn0.nyMWuCAfO9pQRggRLsckXlgrG6tCrRC9a5ScwOKCjr0";
// export const endPointBaseUrl = "https://fetch-be.azurewebsites.net";
export const endPointBaseUrl = "http://localhost:8080/api/v1";

export const publicRequest = axios.create({
  baseURL: endPointBaseUrl,
});

export const userRequest = axios.create({
  baseURL: endPointBaseUrl,
  headers: { token: `Bearer ${TOKEN}` },
});
