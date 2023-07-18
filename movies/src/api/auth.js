import axios from './axios';

export const registerRequest = (user) => axios.post("/users", user);

export const loginRequest = () => axios.get("/users");

