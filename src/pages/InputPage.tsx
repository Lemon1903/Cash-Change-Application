import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";
import Button from "../components/Button";
import Denominations from "../components/Denominations";
import Shell from "../components/Shell";
import { useReceipt } from "../contexts/ReceiptProvider";
import { initialQuantities } from "../lib/data";
import { getValidatedValue } from "../lib/utils";

export default function InputPage() {
  const receipt = useReceipt();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState({ title: "", description: "" });
  const [amount, setAmount] = useState("");
  const [denominations, setDenominations] = useState(initialQuantities);
  const cashGiven = calculateCashGiven();

  function calculateCashGiven() {
    let initialValue = 0;
    Object.entries(denominations).forEach(([key, value]) => {
      if (key === "20c" || key === "20b") {
        initialValue += 20 * value;
      } else {
        initialValue += +key * value;
      }
    });
    return initialValue;
  }

  function handleQuantityChange(denomination: string, quantity: number) {
    setDenominations({ ...denominations, [denomination]: quantity });
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(getValidatedValue(Number(e.target.value)).toString());
  }

  function handleDone() {
    const amountToPay = Number(amount);

    if (amountToPay === 0) {
      setIsOpen(true);
      setMessage({
        title: "Nothing to pay",
        description: "Make sure you have set an amount to pay.",
      });
      return;
    }

    if (cashGiven < amountToPay) {
      setIsOpen(true);
      setMessage({
        title: "Insufficient cash",
        description: "Make sure you have sufficient cash to pay the amount.",
      });
      return;
    }

    receipt.setInput(amountToPay, cashGiven, denominations);
    setDenominations({ ...initialQuantities });
    setIsOpen(false);
    setAmount("");
    navigate("/buyer/output");
  }

  return (
    <Shell>
      {/* Upper Inputs */}
      <div className="grid h-36 max-w-5xl gap-4 text-right text-5xl">
        <div className="grid grid-cols-7 items-center gap-4">
          <label className="col-span-4" htmlFor="amount">
            AMOUNT TO BE PAID:
          </label>
          <input
            id="amount"
            type="number"
            className="col-span-3 border border-border px-4 py-3 text-3xl"
            placeholder="Enter amount in PHP..."
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="grid grid-cols-7 items-center gap-4">
          <label className="col-span-4" htmlFor="cash">
            CASH GIVEN:
          </label>
          <input
            id="cash"
            className="col-span-3 border border-border px-4 py-3 text-3xl disabled:bg-input"
            disabled
            value={cashGiven}
          />
        </div>
      </div>

      {/* Middle Inputs */}
      <Denominations
        quantities={denominations}
        setQuantity={handleQuantityChange}
      />

      {/* Alert Dialog for errors */}
      <AlertDialog
        title={message.title}
        description={message.description}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        trigger={<Button intent="primary" text="Done" onClick={handleDone} />}
        action={<Button intent="dialog" text="Understood" />}
      />
    </Shell>
  );
}
