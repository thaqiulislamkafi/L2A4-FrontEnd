export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  contact:string;
  address : string;
  role: "user" | "provider" | "admin";
  age: number ;
  status: string;
  banned?: boolean;
  banReason?: string | null;
  banExpires?: string | null;
}

export interface LoginResponse {
  redirect: boolean;
  token: string;
  user: AuthUser;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  contact:string;
  address : string;
  role: "user" | "provider" | "admin";
  age: number ;
  status: string;
  banned?: boolean;
  banReason?: string | null;
  banExpires?: string | null;
}

export interface GetUserResponse {
  success: boolean;
  message: string;
  data: User;
}