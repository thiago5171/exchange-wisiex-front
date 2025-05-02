export interface CollectedFees {
  data: CollectedFeesItem[];
  totals: CollectedFeesTotals[];
}

export interface CollectedFeesItem {
  id: number;
  feeValue: number;
  currency: string;
}

export interface CollectedFeesTotals {
  currency: string;
  totalFeeValue: number;
}
