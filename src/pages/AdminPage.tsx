import { Link } from "react-router-dom";
import useSWR from "swr";
import AlertDialog from "../components/AlertDialog";
import Button from "../components/Button";
import Denominations from "../components/Denominations";
import { PageHeader, PageLayout } from "../components/PageLayout";
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
    "https://possible-calm-smelt.glitch.me/db",
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
    <PageLayout>
      {/* Upper Output */}
      <PageHeader>
        <div className="grid items-center gap-2 lg:grid-cols-2 lg:gap-4 xl:grid-cols-7">
          <label className="xl:col-span-4" htmlFor="stocks">
            STOCKS VALUE:
          </label>
          <input
            id="stocks"
            type="number"
            className="border border-border px-4 py-3 text-2xl drop-shadow-md disabled:bg-output xl:col-span-3 xl:text-3xl"
            disabled
            value={stocksValue}
          />
        </div>
      </PageHeader>

      {/* Middle Output */}
      <Denominations quantities={data ? data.stocks : initialQuantities} />

      {/* Transaction History */}
      <h1 className="mt-12 text-2xl md:text-3xl xl:text-5xl">
        TRANSACTION HISTORY
      </h1>
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
                  <div className="mx-auto w-24 xl:space-y-2">
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
                  <div className="mx-auto w-24 xl:space-y-2">
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
    </PageLayout>
  );
}
