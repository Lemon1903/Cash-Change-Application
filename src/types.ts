type TDenominationKeys =
  | "1000"
  | "500"
  | "200"
  | "100"
  | "50"
  | "20b"
  | "20c"
  | "10"
  | "5"
  | "1";

export type TDenominations = {
  [key in TDenominationKeys | string]: number;
};

export type TBillsGiven = { denomination: string; quantity: number };

export interface IReceipt {
  date: string;
  amountToPay: number;
  cashGiven: number;
  totalChange: number;
  billsGiven: Array<TBillsGiven>;
  changeBills: Array<TBillsGiven>;
}

export interface IData {
  stocks: TDenominations;
  transactions: IReceipt[];
}
