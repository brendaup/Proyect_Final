import axios from "./axios";

export const registerRequest = (user) => axios.post("/users", user);

export const loginRequest = () => axios.get("/users");

export const updateUserR = (id, user) => axios.put(`/users/${id}`, user);
