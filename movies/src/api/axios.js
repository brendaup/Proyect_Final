import axios from "axios"

const instance = axios.create({
    baseURL: "https://64af02ecc85640541d4e06ee.mockapi.io"
   
})

export default instance