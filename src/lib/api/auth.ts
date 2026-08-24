import axiosInstance from "../axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const userLoginByEmailAndPassword = async (
  payload: LoginPayload
) => {
  const { data } = await axiosInstance.post(
    "/auth/sign-in",
    payload
  );

  return data;
};

export const userLogout = async () => {
  const { data } = await axiosInstance.post(
    "/auth/sign-out"
  );

  return data;
};


interface SignupData {
  image: File | null;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const userSignup = async (data: SignupData) => {
  const response = await axiosInstance.post(
    "/auth/sign-up",
    {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    }
  );

  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.post("/auth/get-me");

  return response.data;
};