import axios from "axios";
export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});