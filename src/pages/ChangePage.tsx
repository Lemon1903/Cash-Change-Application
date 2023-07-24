import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import AlertDialog from "../components/AlertDialog";
import Button from "../components/Button";
import Denominations from "../components/Denominations";
import { PageHeader, PageLayout } from "../components/PageLayout";
import ShowReceiptDialog from "../components/ShowReceiptDialog";
import { useReceipt } from "../contexts/ReceiptProvider";
import { calculateChange } from "../lib/algorithm";
import { IReceipt, TDenominations } from "../types";

export default function ChangePage() {
  const receipt = useReceipt();
  const navigate = useNavigate();
  const {
    data: stocks,
    isLoading,
    error,
  } = useSWR<TDenominations>(
    "https://cash-change-database.glitch.me/stocks",
    (url) => fetch(url).then((response) => response.json())
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetching error
  if (error) return <div>Error fetching stocks...</div>;

  // Getting the change, bills that make the change, and the updated stock
  const [change, denominations, newStocks] = calculateChange(
    receipt.amountToPay,
    receipt.cashGiven,
    stocks
  );

  // Updating the receipt after calculating the change
  useEffect(() => {
    if (denominations) {
      receipt.setOutput(change, denominations);
    }
  }, [stocks]);

  const isEnoughStocks = useMemo(() => {
    let denominationVal = 0;
    Object.entries(denominations).forEach(([key, quantity]) => {
      if (key === "20c" || key === "20b") {
        denominationVal += 20 * quantity;
      } else {
        denominationVal += Number(key) * quantity;
      }
    });
    return denominationVal === change;
  }, [change, denominations]);
  const message = { title: "", description: "" };

  if (isLoading) {
    message.title = "Loading";
    message.description = "Fetching denomination stocks...";
  } else if (isUpdating) {
    message.title = "Loading";
    message.description = "Saving transaction...";
  } else if (!isEnoughStocks) {
    message.title = "Transaction Failed";
    message.description =
      "Cannot make the change because the stocks is insufficient.";
  } else {
    message.title = "Cannot make a change";
    message.description =
      "Please make sure that you have an amount to pay and have cash for the fee.";
  }

  function addBillsGivenToStock() {
    receipt.billsGiven.forEach(
      (bill) => (newStocks[bill.denomination] += bill.quantity)
    );
    return newStocks;
  }

  async function saveTransaction() {
    setIsUpdating(true);
    const requestInit = (value: TDenominations | IReceipt, method: string) => {
      return {
        method: method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(value),
      };
    };
    const updateStocks = await fetch(
      "https://cash-change-database.glitch.me/stocks",
      requestInit(addBillsGivenToStock(), "PUT")
    );
    const updateTransaction = await fetch(
      "https://cash-change-database.glitch.me/transactions",
      requestInit(receipt, "POST")
    );

    Promise.all([updateStocks, updateTransaction])
      .then(() => {
        receipt.resetState();
        setIsUpdating(false);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
        setIsUpdating(false);
      });
  }

  return (
    <PageLayout>
      {/* Upper Output */}
      <PageHeader>
        <div className="grid items-center gap-2 lg:grid-cols-2 lg:gap-4 xl:grid-cols-7">
          <label className="xl:col-span-4" htmlFor="change">
            TOTAL CHANGE:
          </label>
          <input
            id="change"
            type="number"
            className="border border-border px-4 py-3 text-2xl drop-shadow-md disabled:bg-output xl:col-span-3 xl:text-3xl"
            disabled
            value={change}
          />
        </div>
      </PageHeader>

      {/* Middle Outputs */}
      <Denominations quantities={denominations} />

      {/* Buttons */}
      <div className="flex gap-8 max-md:flex-col">
        <ShowReceiptDialog />
        <Button intent="secondary" text="Main Menu" onClick={saveTransaction} />
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        title={message.title}
        description={message.description}
        isOpen={
          isLoading ||
          isUpdating ||
          !isEnoughStocks ||
          receipt.amountToPay === 0
        }
        action={
          isLoading || isUpdating || isEnoughStocks ? undefined : (
            <Link className="justify-self-end" to="/buyer/input">
              <Button intent="dialog" text="Make some inputs" />
            </Link>
          )
        }
      />
    </PageLayout>
  );
}
