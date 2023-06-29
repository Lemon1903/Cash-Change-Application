import { Link } from "react-router-dom";
import useSWR from "swr";
import AlertDialog from "../components/AlertDialog";
import Button from "../components/Button";
import Denominations from "../components/Denominations";
import Shell from "../components/Shell";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/Table";
import { initialQuantities } from "../lib/data";
import { IData } from "../types";

const tableHeaders = [
  "DATE",
  "AMOUNT TO BE PAID",
  "CASH GIVEN",
  "NO. OF BILLS",
  "TOTAL CHANGE",
  "BILLS OF CHANGE",
];

export default function AdminPage() {
  const { data, isLoading, error } = useSWR<IData>(
    "http://localhost:3000/db",
    (url: string) => fetch(url).then((response) => response.json())
  );

  if (error) return <div>Error fetching stocks...</div>;

  const stocksValue = calculateStocksValue();

  function calculateStocksValue() {
    if (data) {
      return Object.values(data.stocks).reduce(
        (accumulator, value) => accumulator + value,
        0
      );
    }
    return 0;
  }

  return (
    <Shell>
      {/* Upper Output */}
      <div className="grid h-36 max-w-5xl text-right text-5xl">
        <div className="grid grid-cols-7 items-center gap-4">
          <label className="col-span-4" htmlFor="stocks">
            STOCKS VALUE:
          </label>
          <input
            id="stocks"
            type="number"
            className="col-span-3 border border-border px-4 py-3 text-3xl drop-shadow-md disabled:bg-output"
            disabled
            value={stocksValue}
          />
        </div>
      </div>

      {/* Middle Output */}
      <Denominations quantities={data ? data.stocks : initialQuantities} />

      {/* Transaction History */}
      <h1 className="mt-12 text-5xl">TRANSACTION HISTORY</h1>
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            {tableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.transactions && data.transactions.length > 0 ? (
            data.transactions.map((transaction, idx) => (
              // Lists each row of transactions
              <TableRow key={idx}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>PHP {transaction.amountToPay}</TableCell>
                <TableCell>PHP {transaction.cashGiven}</TableCell>
                <TableCell>
                  <div className="space-y-4">
                    {transaction.billsGiven.map((bill, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-2">
                        <span className="text-right">{bill.denomination}</span>
                        <span className="text-left">x {bill.quantity}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>PHP {transaction.totalChange}</TableCell>
                <TableCell>
                  <div className="space-y-4">
                    {transaction.changeBills.map((bill, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-2">
                        <span className="text-right">{bill.denomination}</span>
                        <span className="text-left">x {bill.quantity}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            // No transactions yet
            <TableRow className="h-40">
              <TableCell colSpan={6}>No Transactions yet</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Page Footer */}
      <Link to="/">
        <Button intent="secondary" text="Main Menu" />
      </Link>

      {/* Loading Dialog */}
      <AlertDialog
        title="Loading"
        description="Fetching transaction history..."
        isOpen={isLoading}
      />
    </Shell>
  );
}
