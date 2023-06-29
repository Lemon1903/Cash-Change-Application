import { TBillsGiven, TDenominations } from "../types";

export function getDenominationKey(value: number, type: string) {
  if (value === 20) {
    return type === "coin" ? "20c" : "20b";
  }
  return value.toString();
}

export function getValidatedValue(value: number) {
  if (value <= 0) return 0;
  return value;
}

export function getFormattedDate() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export function getBillsGiven(denominations: TDenominations) {
  const billsGiven: Array<TBillsGiven> = [];
  Object.entries(denominations).forEach(([key, value]) => {
    if (value > 0) {
      billsGiven.push({ denomination: key, quantity: value });
    }
  });
  return billsGiven;
}
