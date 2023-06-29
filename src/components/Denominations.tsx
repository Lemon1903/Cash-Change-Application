import React from "react";
import { getDenominationKey } from "../lib/utils";
import { TDenominations } from "../types";
import Denomination from "./Denomination";

interface IDenominations {
  quantities: TDenominations;
  setQuantity?: (denomination: string, quantity: number) => void;
}

const bills = [1000, 500, 200, 100, 50, 20];
const coins = [20, 10, 5, 1];

export default function Denominations(props: IDenominations) {
  const { quantities, setQuantity } = props;
  const isDisabled = setQuantity ? false : true;

  return (
    <div className="grid justify-items-center gap-6">
      {/* Cash */}
      <div className="flex gap-6">
        {bills.map((bill, idx) => (
          <React.Fragment key={bill}>
            {idx === 0 && <p className="self-end py-3 text-4xl">QTY:</p>}
            <Denomination
              type="cash"
              value={bill}
              isDisabled={isDisabled}
              quantity={quantities[getDenominationKey(bill, "bill")]}
              setQuantity={setQuantity}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Coins */}
      <div className="flex gap-6">
        {coins.map((coin, idx) => (
          <React.Fragment key={coin}>
            {idx === 0 && <p className="self-end py-3 text-4xl">QTY:</p>}
            <Denomination
              type="coin"
              value={coin}
              isDisabled={isDisabled}
              quantity={quantities[getDenominationKey(coin, "coin")]}
              setQuantity={setQuantity}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
