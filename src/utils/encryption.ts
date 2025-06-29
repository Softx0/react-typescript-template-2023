import CryptoJS from "crypto-js";
import {config} from "../config/env";

class EncryptionService {
  private secretKey = config.jwt.secret;

  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  decrypt(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);

    return bytes.toString(CryptoJS.enc.Utf8);
  }

  encryptObject<T>(obj: T): string {
    const jsonString = JSON.stringify(obj);

    return this.encrypt(jsonString);
  }

  decryptObject<T>(cipherText: string): T {
    const jsonString = this.decrypt(cipherText);

    return JSON.parse(jsonString);
  }
}

export const encryptionService = new EncryptionService();
