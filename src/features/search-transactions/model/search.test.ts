import { DateTime } from "luxon";
import { assert, describe, it } from "vitest";

import { Transaction, TransactionType } from "@entities/transaction";

import { searchTransactionsByTitle } from "./search";

describe("search transactions", () => {
  const now = DateTime.local();

  it("empty list", () => {
    const transactions: Transaction[] = [];
    const actual = searchTransactionsByTitle(transactions, "term");
    assert.deepEqual(actual, transactions);
  });

  it("without matches", () => {
    const transactions: Transaction[] = [
      {
        id: "1",
        type: TransactionType.expense,
        title: "Some title",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
      {
        id: "2",
        type: TransactionType.expense,
        title: "Some title 2",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
    ];
    const actual = searchTransactionsByTitle(transactions, "term");
    assert.deepEqual(actual, []);
  });

  it("with 1 match", () => {
    const transactions: Transaction[] = [
      {
        id: "1",
        type: TransactionType.expense,
        title: "Erase your disk",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
      {
        id: "2",
        type: TransactionType.expense,
        title: "Some title 2",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
    ];
    const actual = searchTransactionsByTitle(transactions, "title");
    assert.deepEqual(actual, [
      {
        id: "2",
        type: TransactionType.expense,
        title: "Some title 2",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
    ]);
  });

  it("with multiple matches", () => {
    const transactions: Transaction[] = [
      {
        id: "1",
        type: TransactionType.expense,
        title: "Erase your disk",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
      {
        id: "2",
        type: TransactionType.expense,
        title: "Erase your disk 2",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
    ];
    const actual = searchTransactionsByTitle(transactions, "erase");
    assert.deepEqual(actual, [
      {
        id: "1",
        type: TransactionType.expense,
        title: "Erase your disk",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
      {
        id: "2",
        type: TransactionType.expense,
        title: "Erase your disk 2",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
    ]);
  });

  it("with empty search term", () => {
    const transactions: Transaction[] = [
      {
        id: "1",
        type: TransactionType.expense,
        title: "Erase your disk",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
      {
        id: "2",
        type: TransactionType.expense,
        title: "Erase your disk 2",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
    ];
    const actual = searchTransactionsByTitle(transactions, "");
    assert.deepEqual(actual, [
      {
        id: "1",
        type: TransactionType.expense,
        title: "Erase your disk",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
      {
        id: "2",
        type: TransactionType.expense,
        title: "Erase your disk 2",
        categoryId: "10",
        accountId: "100",
        amount: "1",
        datetime: now,
        createdAt: now,
      },
    ]);
  });
});
