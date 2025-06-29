import {encryptionService} from "./encryption";
import {JWTPayload} from "../types";

class JWTService {
  private createMockJWT(payload: Omit<JWTPayload, "exp" | "iat">): string {
    const now = Math.floor(Date.now() / 1000);
    const fullPayload: JWTPayload = {
      ...payload,
      iat: now,
      exp: now + 24 * 60 * 60 // 24 hours
    };

    // Simulamos un JWT real encriptado
    const mockJWT = encryptionService.encryptObject(fullPayload);

    return `mock.${mockJWT}.signature`;
  }

  generateToken(user: {id: string; email: string; role: string}): string {
    return this.createMockJWT({
      userId: user.id,
      email: user.email,
      role: user.role
    });
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      const parts = token.split(".");

      if (parts.length !== 3) return null;

      const payload = encryptionService.decryptObject<JWTPayload>(parts[1]);

      // Verificar expiración
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const payload = this.verifyToken(token);

    return !payload;
  }

  getTokenPayload(token: string): JWTPayload | null {
    return this.verifyToken(token);
  }
}

export const jwtService = new JWTService();
