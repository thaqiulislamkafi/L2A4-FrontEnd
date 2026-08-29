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
}

export interface LoginResponse {
  redirect: boolean;
  token: string;
  user: AuthUser;
}