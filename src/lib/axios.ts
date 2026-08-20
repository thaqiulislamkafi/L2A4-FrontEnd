
import axios from "axios";
// import Cookies from "js-cookie";

const baseURL :string = String(process.env.NEXT_PUBLIC_BASE_URL)

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials : true,
});

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     }
// );

export default axiosInstance;