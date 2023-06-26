import Fuse from "fuse.js";

interface SearchTransaction {
  title: string;
}

export const searchTransactionsByTitle = <T extends SearchTransaction>(
  transactions: T[],
  searchTerm?: string,
): T[] => {
  searchTerm = searchTerm?.trim();
  if (!searchTerm) {
    return transactions;
  }

  const fuse = new Fuse(transactions, {
    keys: ["title"] as (keyof SearchTransaction)[],
    ignoreLocation: true,
    threshold: 0.3,
  });
  const result = fuse.search(searchTerm);
  return result.map((i) => i.item);
};
