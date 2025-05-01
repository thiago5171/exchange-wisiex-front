import { useEffect, useState } from "react";
import { OrderBook, OrderHistory } from "../types/order";
import socketService from "../api/socketClient";
import orderApi from "../api/order";
import { Stats } from "../types/stats";
import { Matches } from "../types/matches";

export function useWebSecketData() {
  const [orderBook, setOrderBook] = useState<OrderBook | null>();
  const [stats, setStats] = useState<Stats | null>(null);
  const [newMatchs, setNewMatchs] = useState<Matches[]>([]);
  const [myHistory, setMyHistory] = useState<OrderHistory[]>([]);
  const [myActiveOrders, setMyActiveOrders] = useState<any[]>([]);

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

    if (!myHistory || myHistory.length === 0) {
      promises.push(
        orderApi.getMyHistory().then((r) => {
          setMyHistory(r);
        })
      );
    }

    if (!myActiveOrders || myActiveOrders.length === 0) {
      promises.push(
        orderApi.getMyActiveOrders().then((r) => {
          setMyActiveOrders(r);
        })
      );
    }

    await Promise.all(promises);
  }

  useEffect(() => {
    fetchInitialData();
    socketService.on("orderBookUpdate", setOrderBook);

    socketService.on("statsUpdate", setStats);

    socketService.on("newMatch", setNewMatchs);

    socketService.on("myHistory", setMyHistory);

    socketService.on("myActiveOrders", setMyActiveOrders);

    return () => {
      socketService.off("orderBookUpdate", setOrderBook);
      socketService.off("statsUpdate", setStats);
      socketService.off("newMatch", setNewMatchs);
    };
  }, [orderApi, orderBook]);

  return { orderBook, stats, newMatchs, myHistory, myActiveOrders };
}
