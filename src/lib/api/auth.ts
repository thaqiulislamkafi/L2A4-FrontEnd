import { GetUserResponse, User } from "@/types/auth.type";
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


export interface SignupData {
  image?: string | File | null;
  name: string;
  email: string;
  password: string;
  role: string;
  contact?: string | null;
  age?: number | null;
  address?: string | null;
}

/**
 * 
 * @param data role: "provider" as const,
      contact: "",
      age: "",
      address: "",
 * @returns 
 */

export const userSignup = async (data: SignupData) => {
  const response = await axiosInstance.post(
    "/auth/sign-up",
    {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      contact: data.contact ?? null,
      age: data.age ?? null,
      address: data.address ?? null,
      image: data.image ?? null,
    }
  );

  return response.data;
};

export const uploadUserImage = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axiosInstance.post(
    "/auth/image-upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.post("/auth/get-me");

  return response.data;
};



export const getUser = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<GetUserResponse>(`/auth/${id}`);

  return response.data.data;
};