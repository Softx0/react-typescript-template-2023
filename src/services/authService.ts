import {jwtService} from "../utils/jwt";
import {LoginRequest, LoginResponse} from "../types";

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // Mock de login - en producción sería una llamada real al API
      const mockUser = {
        id: "1",
        email: credentials.email,
        name: "Usuario Test",
        role: "user"
      };

      const token = jwtService.generateToken(mockUser);

      return {
        user: mockUser,
        token
      };
    } catch (error) {
      throw new Error("Credenciales inválidas");
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem("authToken");
  }

  async refreshToken(): Promise<string> {
    const currentToken = localStorage.getItem("authToken");

    if (!currentToken) throw new Error("No token found");

    const payload = jwtService.getTokenPayload(currentToken);

    if (!payload) throw new Error("Invalid token");

    const newToken = jwtService.generateToken({
      id: payload.userId,
      email: payload.email,
      role: payload.role
    });

    localStorage.setItem("authToken", newToken);

    return newToken;
  }

  validateToken(token: string): boolean {
    return !jwtService.isTokenExpired(token);
  }
}

export const authService = new AuthService();
