import axios from "axios";
import { userURL } from "./URL";
import { User } from "./../interfaces/user";

const host = "http://localhost:8080";
const apiClient = axios.create({
  baseURL: host,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default apiClient;

export const deleteUser = (id: number) =>
  apiClient.delete(`${userURL.deleteUser}/${id}`);
export const createUser = (params: User) =>
  apiClient.post(userURL.createUser, params);
export const getLastId = () =>
  apiClient.get(`${userURL.getUsers}?page=0&size=1&sort=id,desc`);
