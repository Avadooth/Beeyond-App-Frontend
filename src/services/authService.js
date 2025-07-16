import api from "./api";
import { jwtDecode } from "jwt-decode";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  const token = res.data.token;
  localStorage.setItem("token", token);

  // 🔍 Decode the token to extract user info
  const user = jwtDecode(token); // user.role is now available
  localStorage.setItem("user", JSON.stringify(user));

  return user; // contains role: 'admin' | 'customer' | 'partner'
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
