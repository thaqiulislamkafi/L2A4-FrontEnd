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

export const logoutAllSessions = async () => {
  const response = await axiosInstance.post("/auth/logout-all");

  return response.data;
};

import { VerifyEmailOtpResponse } from "@/types/meal-review.type";

export interface SendEmailOtpPayload {
  email: string;
}

export interface SendEmailOtpResponse {
  success: boolean;
  message: string;
  data: boolean;
}

export interface VerifyEmailOtpPayload {
  email: string;
  otp: string;
}


export const sendEmailOtp = async (
  payload: SendEmailOtpPayload
): Promise<SendEmailOtpResponse> => {
  const response = await axiosInstance.post<SendEmailOtpResponse>(
    "/auth/send-email-otp",
    payload
  );

  return response.data;
};

export const verifyEmailOtp = async (
  payload: VerifyEmailOtpPayload
): Promise<VerifyEmailOtpResponse> => {
  const response = await axiosInstance.post<VerifyEmailOtpResponse>(
    "/auth/verify-otp-email",
    payload
  );

  return response.data;
};

export interface ChangeEmailPayload {
  newEmail: string;
}

export interface VerifyChangedEmailPayload extends ChangeEmailPayload {
  otp: string;
}

export interface ChangeEmailResponse {
  success: boolean;
  message: string;
  data?: {
    success: boolean;
  };
}

export const sendChangeEmailOtp = async (
  payload: ChangeEmailPayload
): Promise<ChangeEmailResponse> => {
  const response = await axiosInstance.post<ChangeEmailResponse>(
    "/auth/otp-change-email",
    payload
  );

  return response.data;
};

export const verifyChangedEmail = async (
  payload: VerifyChangedEmailPayload
): Promise<ChangeEmailResponse> => {
  const response = await axiosInstance.post<ChangeEmailResponse>(
    "/auth/change-email",
    payload
  );

  return response.data;
};