import { useEffect } from "react";
import api from "@/config/axios";
import { useUserStore } from "@/store/useUserStore";

export const useAuth = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user) return;

    const fetchMe = async () => {
      try {
        const res = await api.get("api/auth/getme");
        setUser(res.data);
      } catch { }
    };

    fetchMe();
  }, [user, setUser]);
};
