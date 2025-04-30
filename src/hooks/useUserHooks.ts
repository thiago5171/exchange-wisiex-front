import { useEffect, useState } from "react";
import { User } from "../types/user";
import userApi from "../api/user";

export const useUserHooks = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getUserInfo();
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
      }
    };

    fetchUser();
  }, []);

  return { user };
};
