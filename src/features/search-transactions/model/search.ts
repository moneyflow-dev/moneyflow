import Fuse from "fuse.js";

import { Transaction } from "@entities/transaction";

export const searchTransactionsByTitle = (
  transactions: Transaction[],
  searchTerm?: string,
): Transaction[] => {
  searchTerm = searchTerm?.trim();
  if (!searchTerm) {
    return transactions;
  }

  const fuse = new Fuse(transactions, {
    keys: ["title"] as (keyof Transaction)[],
    ignoreLocation: true,
    threshold: 0.3,
  });
  const result = fuse.search(searchTerm);
  return result.map((i) => i.item);
};
