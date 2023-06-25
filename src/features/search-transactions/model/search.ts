import Fuse from "fuse.js";

import { Transaction } from "@entities/transaction";

export const searchTransactionsByTitle = (
  transactions: Transaction[],
  searchTerm?: string,
): Transaction[] => {
  if (!searchTerm) {
    return transactions;
  }

  const fuse = new Fuse(transactions, {
    keys: ["title"] as (keyof Transaction)[],
    includeScore: true,
  });
  const result = fuse.search(searchTerm.trim());
  return result.map((i) => i.item);
};
