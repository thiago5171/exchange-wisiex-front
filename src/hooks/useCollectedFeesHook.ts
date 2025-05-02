import { useEffect, useState } from "react";
import collectedFeesApi from "../api/collectedFees";
import { CollectedFees } from "../types/collectedFees";

export const useCollectedFees = () => {
  const [collectedFees, setCollectedFees] = useState<CollectedFees>();
  const [loading, setLoading] = useState(true);

  const fetchCollectedFees = async () => {
    setLoading(true);
    try {
      const data = await collectedFeesApi.getCollectedFees();
      setCollectedFees(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectedFees();
  }, []);

  return { collectedFees, loading, fetchCollectedFees };
};
