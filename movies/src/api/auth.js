import axios from './axios';



export const registerRequest = (user) => axios.post("/", user);


export const loginRequest = () => axios.get();