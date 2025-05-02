import { useEffect, useState } from "react";
import orderApi from "../api/order";
import { myActiveOrder, OrderHistory } from "../types/order";

const useOrderHooks = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [activeOrders, setActiveOrders] = useState<myActiveOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await orderApi.getMyHistory();
      setOrderHistory(response);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveOrders = async () => {
    try {
      setLoading(true);
      const response = await orderApi.getMyActiveOrders();
      setActiveOrders(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
    fetchActiveOrders();
  }, []);

  return {
    orderHistory,
    activeOrders,
    fetchOrderHistory,
    fetchActiveOrders,
    loading,
  };
};

export default useOrderHooks;
