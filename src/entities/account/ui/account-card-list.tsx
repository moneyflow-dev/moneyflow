import { AccountCard, AccountCardAccount } from "./account-card";

export interface AccountCardListAccount {
  account: AccountCardAccount;
  formattedBalance: string;
}

interface AccountCardListProps {
  accounts: AccountCardListAccount[];
}

export const AccountCardList = ({ accounts }: AccountCardListProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      {accounts.map((account) => (
        <AccountCard
          key={account.account.id}
          account={account.account}
          formattedBalance={account.formattedBalance}
        />
      ))}
    </div>
  );
};
