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
