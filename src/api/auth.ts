import { LoginResponse } from "../types/loginResponse";
import backendClient from "./backendClient";

class AuthApi {
  async login(obj: LoginResponse): Promise<void> {
    try {
      const response = await backendClient.post<{
        accessToken: string;
      }>("/auth/login", {
        username: obj.username,
      });
      const token = response.data.accessToken;
      localStorage.setItem("jwtToken", token);
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  }

  async logout(): Promise<void> {
    try {
      await backendClient.post("/logout");
      localStorage.removeItem("jwtToken");
    } catch (error) {
      throw new Error("Logout failed. Please try again.");
    }
  }
}

const authService = new AuthApi();
export default authService;
