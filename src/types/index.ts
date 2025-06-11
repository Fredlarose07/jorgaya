// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface EmailCheckResponse {
  exists: boolean;
  email: string;
}

// Types pour les erreurs API
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Types pour les formulaires
export interface EmailFormData {
  email: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}