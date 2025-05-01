export interface CreateOrder {
  type: "BUY" | "SELL";
  amount: number;
  price: number;
}

export interface OrderBook {
  bids: Array<OrderBookItem>;
  asks: Array<OrderBookItem>;
}

export interface OrderBookItem {
  price: number;
  volume: number;
}

export interface OrderHistory {
  id: string;
  type: "BUY" | "SELL";
  price: number;
  volume: number;
}

export interface myActiveOrder {
  id: string;
  type: "BUY" | "SELL";
  price: number;
  amount: number;
  status: "ACTIVE" | "CANCELED" | "COMPLETED";
}
