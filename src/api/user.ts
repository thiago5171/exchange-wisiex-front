import { User } from "../types/user";
import backendClient from "./backendClient";

class UserApi {
  async getUserInfo(): Promise<User> {
    try {
      const response = await backendClient.get<User>("/user/profile");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user info. Please try again.");
    }
  }
}

const userApi = new UserApi();
export default userApi;
