import api from "../api/axios";

export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password });

export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password });

export const logoutUser = ()=>{
  return api.post("/auth/logout");
}

export const getMe = () => api.get("/auth/me");
