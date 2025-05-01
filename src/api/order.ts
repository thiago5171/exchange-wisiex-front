import { Matches } from "../types/matches";
import { CreateOrder, OrderBook, OrderHistory } from "../types/order";
import { Stats } from "../types/stats";
import backendClient from "./backendClient";

export class OrderApi {
  async create(orderData: CreateOrder): Promise<any> {
    try {
      const response = await backendClient.post("/orders", orderData);
      return response.data;
    } catch (error: any) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Failed to create order. Please try again.");
      }
    }
  }

  async cancel(orderId: string): Promise<any> {
    try {
      const response = await backendClient.patch(`/orders/cancel/${orderId}`);
      return response.data;
    } catch (error: any) {
      throw new Error("Failed to cancel order. Please try again.");
    }
  }

  async getOrdersBook(): Promise<OrderBook> {
    try {
      const response = await backendClient.get<OrderBook>("/orders/book");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orders. Please try again.");
    }
  }

  async getStats(): Promise<Stats> {
    try {
      const response = await backendClient.get<Stats>("/orders/stats");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch stats. Please try again.");
    }
  }

  async getMatches(): Promise<Matches[]> {
    try {
      const response = await backendClient.get<Matches[]>("/orders/matches");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch matches. Please try again.");
    }
  }

  async getMyHistory(): Promise<OrderHistory[]> {
    try {
      const response = await backendClient.get<OrderHistory[]>(
        "/matches/history"
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch my history. Please try again.");
    }
  }

  async getMyActiveOrders(): Promise<any[]> {
    try {
      const response = await backendClient.get<Matches[]>(
        "/orders/my-active-orders"
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch my active orders. Please try again.");
    }
  }
}

const orderApi = new OrderApi();
export default orderApi;
