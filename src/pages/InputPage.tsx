import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";
import Button from "../components/Button";
import Denominations from "../components/Denominations";
import { PageHeader, PageLayout } from "../components/PageLayout";
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
    <PageLayout>
      {/* Upper Inputs */}
      <PageHeader>
        <div className="grid items-center gap-2 lg:grid-cols-2 lg:gap-4 xl:grid-cols-7">
          <label className="xl:col-span-4" htmlFor="amount">
            AMOUNT TO BE PAID:
          </label>
          <input
            id="amount"
            type="number"
            className="border border-border px-4 py-3 text-2xl xl:col-span-3 xl:text-3xl"
            placeholder="Enter amount in PHP..."
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="grid items-center gap-2 lg:grid-cols-2 lg:gap-4 xl:grid-cols-7">
          <label className="xl:col-span-4" htmlFor="cash">
            CASH GIVEN:
          </label>
          <input
            id="cash"
            className="border border-border px-4 py-3 text-2xl disabled:bg-input xl:col-span-3 xl:text-3xl"
            disabled
            value={cashGiven}
          />
        </div>
      </PageHeader>

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
    </PageLayout>
  );
}
