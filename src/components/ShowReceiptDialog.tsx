import * as Dialog from "@radix-ui/react-dialog";
import { useReceipt } from "../contexts/ReceiptProvider";
import Button from "./Button";
export default function ShowReceiptDialog() {
  const receipt = useReceipt();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button intent="primary" text="Show Receipt" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-border/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -mt-6 -translate-x-1/2 -translate-y-1/2 divide-y divide-muted border-2 border-border bg-input px-6 py-10 text-3xl drop-shadow-md">
          {/* Dialog Header */}
          <Dialog.Title className="pb-4">
            DATE: <span className="text-muted">{receipt.date}</span>
          </Dialog.Title>

          {/* Dialog Main Content */}
          <div className="h-52 space-y-4 py-4">
            <div className="grid grid-cols-3 gap-6">
              <h2 className="col-span-2">CASH GIVEN:</h2>
              <span className="text-muted">{receipt.cashGiven}</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <h2 className="col-span-2">AMOUNT TO PAY:</h2>
              <span className="text-muted">{receipt.amountToPay}</span>
            </div>
          </div>

          {/* Dialog Footer */}
          <div className="grid grid-cols-3 gap-6 pt-4">
            <h2 className="col-span-2">TOTAL CHANGE:</h2>
            <span className="text-muted">{receipt.totalChange}</span>
          </div>

          {/* Dialog Close */}
          <Dialog.Close className="absolute right-5 top-5 scale-75 border-none opacity-60 hover:opacity-100">
            <svg width="26" height="26" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23.607.98l1.414 1.413L14.414 13l10.607 10.607-1.414 1.414L13 14.414 2.393 25.021.98 23.607 11.586 13 .98 2.393 2.393.98 13 11.586 23.607.98z"
                fill="#000"
                fillRule="evenodd"
              />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
