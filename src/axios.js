import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/flipstore-b4612/us-central1/api/",
});

export default instance;
