import { useEffect, useState } from "react";
import { User } from "../types/user";
import userApi from "../api/user";

export const useUserHooks = () => {
  const [user, setUser] = useState<User | null>(null);
  const fetchUser = async () => {
    try {
      const response = await userApi.getUserInfo();
      setUser(response);
    } finally {
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, fetchUser };
};
