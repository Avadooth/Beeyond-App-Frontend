import api from "./api";
import { jwtDecode } from "jwt-decode";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  const token = res.data.token;
  localStorage.setItem("token", token);


  const user = jwtDecode(token); 
  localStorage.setItem("user", JSON.stringify(user));

  return user; 
};

export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  localStorage.setItem("token", res.data.token);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem("token");
