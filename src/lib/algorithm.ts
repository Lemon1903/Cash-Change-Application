import { TDenominations } from "../types";
import { initialQuantities } from "./data";

export function calculateChange(
  amountToPay: number,
  cashGiven: number,
  denominationStocks?: TDenominations
): [number, TDenominations, TDenominations] {
  // the calculated change
  let changeAmount = cashGiven - amountToPay;

  // return if no stocks
  if (!denominationStocks) {
    return [changeAmount, initialQuantities, initialQuantities];
  }

  // get the list of all denomination in this order
  const denominations = [
    "1000",
    "500",
    "200",
    "100",
    "50",
    "20b",
    "20c",
    "10",
    "5",
    "1",
  ];

  // initialize the dictionary that would hold the change
  const newStocks = { ...denominationStocks };
  const changeDenominations = { ...initialQuantities };

  for (let i = 0; i < denominations.length; i++) {
    const denominationKey = denominations[i];

    // check if denomination is 20 as it could be a bill or coin but same value
    let denominationValue: number;
    if (["20b", "20c"].includes(denominationKey)) {
      denominationValue = 20;
    } else {
      denominationValue = Number(denominationKey);
    }
    // get how many of that denomination fit the change
    const count = Math.floor(changeAmount / denominationValue);

    // check if that denomination can make the change and if it have a stock
    const denominationStock = newStocks[denominationKey];
    if (count > 0 && denominationStock > 0) {
      if (denominationStock >= count) {
        // stock satisfies the number of denominations needed to make the change
        changeDenominations[denominationKey] = count;
        newStocks[denominationKey] -= count;
        changeAmount -= count * denominationValue;
      } else {
        // stock is insufficient so get what is left in the stock
        changeDenominations[denominationKey] = denominationStock;
        changeAmount -= denominationStock * denominationValue;
        newStocks[denominationKey] = 0;
      }
    }
  }

  // return the set of denominations that builds the change
  return [cashGiven - amountToPay, changeDenominations, newStocks];
}
