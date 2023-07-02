import { Link } from "@shared/ui/links";

import { createTransferAmountString } from "../lib";
import { TransferID } from "../model/models";

import { TransactionCard } from "./transaction-card";

interface TransferCardTransferAccount {
  accountTitle: string;
  amount: string;
}

interface TransferCardTransfer {
  id: TransferID;
  title: string;
  fromAccount: TransferCardTransferAccount;
  toAccount: TransferCardTransferAccount;
  sameCurrencies: boolean;
  time: string;
}

interface TransferCardProps {
  transfer: TransferCardTransfer;
}

export const TransferCard = ({ transfer }: TransferCardProps) => {
  const fromAmount = transfer.fromAccount.amount;
  const toAmount = transfer.toAccount.amount;
  const formattedAmount = createTransferAmountString({
    fromAmount,
    toAmount,
    sameCurrencies: transfer.sameCurrencies,
  });

  return (
    <Link to={`/transfers/${transfer.id}`}>
      <TransactionCard
        title={transfer.title}
        formattedAmount={formattedAmount}
        time={transfer.time}
        firstProperty={{
          title: "From",
          value: transfer.fromAccount.accountTitle,
        }}
        secondProperty={{
          title: "To",
          value: transfer.toAccount.accountTitle,
        }}
        className="border-blue"
        amountClassName="text-blue"
      />
    </Link>
  );
};
