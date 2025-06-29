export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}
