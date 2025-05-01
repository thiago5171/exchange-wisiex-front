import { useEffect, useState } from "react";
import collectedFeesApi from "../api/collectedFees";

export const useCollectedFees = () => {
  const [collectedFees, setCollectedFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCollectedFees = async () => {
    setLoading(true);
    try {
      const data = await collectedFeesApi.getCollectedFees();
      setCollectedFees(data);
    } catch (error) {
      console.error("Error fetching collected fees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectedFees();
  }, []);

  return { collectedFees, loading, fetchCollectedFees };
};
