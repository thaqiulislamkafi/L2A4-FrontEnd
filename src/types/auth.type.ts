export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  contact:string;
  role: string;
  status: string;
}

export interface LoginResponse {
  redirect: boolean;
  token: string;
  user: AuthUser;
}