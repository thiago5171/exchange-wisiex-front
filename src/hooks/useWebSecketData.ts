import { useEffect, useState } from "react";
import { OrderBook } from "../types/order";
import socketService from "../api/socketClient";
import orderApi from "../api/order";
import { Stats } from "../types/stats";
import { Matches } from "../types/matches";

export function useWebSecketData() {
  const [orderBook, setOrderBook] = useState<OrderBook | null>();
  const [stats, setStats] = useState<Stats | null>(null);
  const [newMatchs, setNewMatchs] = useState<Matches[]>([]);

  useEffect(() => {
    async function fetchInitialOrderBook() {
      if (orderBook == null || stats == null || newMatchs == null) {
        console.log("Fetching initial data from APIAAAAAAAAAAAAAAAAAAAA...");
        orderApi.getOrdersBook().then((r) => {
          setOrderBook(r);
        });

        orderApi.getStats().then((r) => {
          setStats(r);
        });
        orderApi.getMatches().then((r) => {
          setNewMatchs(r);
        });
      }
    }

    fetchInitialOrderBook();
    socketService.on("orderBookUpdate", setOrderBook);

    socketService.on("statsUpdate", setStats);

    socketService.on("newMatch", setNewMatchs);

    return () => {
      socketService.off("orderBookUpdate", setOrderBook);
      socketService.off("statsUpdate", setStats);
      socketService.off("newMatch", setNewMatchs);
    };
  }, [orderApi, orderBook]);

  return { orderBook, stats, newMatchs };
}
