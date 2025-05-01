import { useEffect, useState } from "react";
import { OrderBook } from "../types/order";
import socketService from "../api/socketClient";
import orderApi from "../api/order";
import { Stats } from "../types/stats";
import { Matches } from "../types/matches";

export function useWebSecketData() {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [newMatchs, setNewMatchs] = useState<Matches[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchInitialData() {
    const promises = [];

    if (!orderBook) {
      promises.push(
        orderApi.getOrdersBook().then((r) => {
          setOrderBook(r);
        })
      );
    }

    if (!stats) {
      promises.push(
        orderApi.getStats().then((r) => {
          setStats(r);
        })
      );
    }

    if (!newMatchs || newMatchs.length === 0) {
      promises.push(
        orderApi.getMatches().then((r) => {
          setNewMatchs(r);
        })
      );
    }
    await Promise.all(promises);
  }

  useEffect(() => {
    setLoading(true);
    fetchInitialData();
    socketService.on("orderBookUpdate", (data: OrderBook) => {
      setOrderBook(data);
    });

    socketService.on("statsUpdate", setStats);

    socketService.on("newMatch", setNewMatchs);
    setLoading(false);

    return () => {
      socketService.off("orderBookUpdate", setOrderBook);
      socketService.off("statsUpdate", setStats);
      socketService.off("newMatch", setNewMatchs);
    };
  }, [orderApi, orderBook]);

  return {
    orderBook,
    stats,
    newMatchs,
    loading,
  };
}
