import { api, handleApiError } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/constants';
import type { 
  EmailCheckResponse, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  User
} from '@/types';

export class AuthService {
  
  // Vérifier si un email existe déjà
  static async checkEmail(email: string): Promise<EmailCheckResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.CHECK_EMAIL, { email });
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  }

  // Connexion
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const authData: AuthResponse = response.data;
      
      // Sauvegarder les données d'authentification
      this.saveAuthData(authData);
      
      return authData;
    } catch (error: any) {
      throw handleApiError(error);
    }
  }

  // Inscription
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      const authData: AuthResponse = response.data;
      
      // Sauvegarder les données d'authentification
      this.saveAuthData(authData);
      
      return authData;
    } catch (error: any) {
      throw handleApiError(error);
    }
  }

  // Déconnexion
  static async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // On continue même si l'API échoue
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Nettoyer les données locales
      this.clearAuthData();
    }
  }

  // Rafraîchir le token
  static async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error('Aucun refresh token disponible');
      }

      const response = await api.post(API_ENDPOINTS.AUTH.REFRESH, { 
        refreshToken 
      });
      
      const { token } = response.data;
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      
      return token;
    } catch (error: any) {
      this.clearAuthData();
      throw handleApiError(error);
    }
  }

  // Sauvegarder les données d'authentification
  private static saveAuthData(authData: AuthResponse): void {
    localStorage.setItem(STORAGE_KEYS.TOKEN, authData.token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authData.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authData.user));
  }

  // Nettoyer les données d'authentification
  static clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  // Vérifier si l'utilisateur est connecté
  static isAuthenticated(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return !!token;
  }

  // Récupérer l'utilisateur courant
  static getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  }

  // Récupérer le token courant
  static getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }
}