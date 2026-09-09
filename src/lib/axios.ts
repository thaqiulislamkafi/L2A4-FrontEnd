
import axios from "axios";

const baseURL :string = String(process.env.NEXT_PUBLIC_BASE_URL)

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials : true,
});

export default axiosInstance;