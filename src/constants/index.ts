// Configuration API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Routes de l'application
export const ROUTES = {
  HOME: '/',
  EMAIL_CHECK: '/auth/email',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
} as const;

// Endpoints API
export const API_ENDPOINTS = {
  AUTH: {
    CHECK_EMAIL: '/auth/check-email',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
} as const;

// Clés pour le localStorage
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
} as const;

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Veuillez réessayer.',
  INVALID_CREDENTIALS: 'Email ou mot de passe incorrect.',
  EMAIL_ALREADY_EXISTS: 'Cet email est déjà utilisé.',
  WEAK_PASSWORD: 'Le mot de passe doit contenir au moins 8 caractères.',
  PASSWORDS_DONT_MATCH: 'Les mots de passe ne correspondent pas.',
  INVALID_EMAIL: 'Veuillez saisir un email valide.',
} as const;