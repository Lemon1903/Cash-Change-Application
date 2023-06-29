import { PropsWithChildren, createContext, useContext, useState } from "react";
import { getBillsGiven, getFormattedDate } from "../lib/utils";
import { IReceipt, TDenominations } from "../types";

interface IActions {
  setInput: (
    amountToPay: number,
    cashGiven: number,
    denominations: TDenominations
  ) => void;
  setOutput: (change: number, denominations: TDenominations) => void;
  resetState: () => void;
}

const initialReciept: IReceipt = {
  date: "",
  amountToPay: 0,
  cashGiven: 0,
  billsGiven: [],
  totalChange: 0,
  changeBills: [],
};

const ReceiptContext = createContext<(IReceipt & IActions) | null>(null);

export default function ReceiptProvider({ children }: PropsWithChildren) {
  const [receipt, setReceipt] = useState(initialReciept);

  function setInput(
    amountToPay: number,
    cashGiven: number,
    denominations: TDenominations
  ) {
    setReceipt({
      ...receipt,
      date: getFormattedDate(),
      amountToPay: amountToPay,
      cashGiven: cashGiven,
      billsGiven: getBillsGiven(denominations),
    });
  }

  function setOutput(change: number, denominations: TDenominations) {
    setReceipt({
      ...receipt,
      totalChange: change,
      changeBills: getBillsGiven(denominations),
    });
  }

  function resetState() {
    setReceipt({ ...initialReciept });
  }

  return (
    <ReceiptContext.Provider
      value={{ ...receipt, setInput, setOutput, resetState }}
    >
      {children}
    </ReceiptContext.Provider>
  );
}

export function useReceipt() {
  const receipt = useContext(ReceiptContext);
  if (receipt === null) {
    throw new Error("Children must have a ReceiptProvider to use the receipt");
  }
  return receipt;
}
