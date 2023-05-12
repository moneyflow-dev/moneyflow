import { DateTime } from "luxon";
import { assert, describe, it } from "vitest";

import { Transaction, TransactionType } from "@entities/transaction";

import { groupTransactionsByDay } from "./group";

describe("groupTransactionsByDay", () => {
  it("with same day", () => {
    const transactions: Transaction[] = [
      {
        type: TransactionType.expense,
        id: "1",
        title: "Transaction 1",
        accountId: "10",
        categoryId: "100",
        amount: "120",
        datetime: DateTime.fromISO("2023-05-09T18:22:12"),
        createdAt: DateTime.fromISO("2023-05-09T18:23:12"),
      },
      {
        type: TransactionType.expense,
        id: "2",
        title: "Transaction 2",
        accountId: "10",
        categoryId: "100",
        amount: "120",
        datetime: DateTime.fromISO("2023-05-09T13:22:12"),
        createdAt: DateTime.fromISO("2023-05-09T13:23:12"),
      },
    ];

    const actual = groupTransactionsByDay(transactions);
    assert.deepEqual(actual, [
      {
        datetime: DateTime.fromISO("2023-05-09"),
        transactions: [
          {
            type: TransactionType.expense,
            id: "1",
            title: "Transaction 1",
            accountId: "10",
            categoryId: "100",
            amount: "120",
            datetime: DateTime.fromISO("2023-05-09T18:22:12"),
            createdAt: DateTime.fromISO("2023-05-09T18:23:12"),
          },
          {
            type: TransactionType.expense,
            id: "2",
            title: "Transaction 2",
            accountId: "10",
            categoryId: "100",
            amount: "120",
            datetime: DateTime.fromISO("2023-05-09T13:22:12"),
            createdAt: DateTime.fromISO("2023-05-09T13:23:12"),
          },
        ],
      },
    ]);
  });

  it("with 2 different days", () => {
    const transactions: Transaction[] = [
      {
        type: TransactionType.expense,
        id: "1",
        title: "Transaction 1",
        accountId: "10",
        categoryId: "100",
        amount: "120",
        datetime: DateTime.fromISO("2023-05-09T18:22:12"),
        createdAt: DateTime.fromISO("2023-05-09T18:23:12"),
      },
      {
        type: TransactionType.expense,
        id: "2",
        title: "Transaction 2",
        accountId: "10",
        categoryId: "100",
        amount: "120",
        datetime: DateTime.fromISO("2023-05-10T13:22:12"),
        createdAt: DateTime.fromISO("2023-05-10T13:23:12"),
      },
      {
        type: TransactionType.expense,
        id: "3",
        title: "Transaction 3",
        accountId: "10",
        categoryId: "100",
        amount: "120",
        datetime: DateTime.fromISO("2023-05-10T13:22:12"),
        createdAt: DateTime.fromISO("2023-05-10T13:23:12"),
      },
    ];

    const actual = groupTransactionsByDay(transactions);
    assert.deepEqual(actual, [
      {
        datetime: DateTime.fromISO("2023-05-10"),
        transactions: [
          {
            type: TransactionType.expense,
            id: "2",
            title: "Transaction 2",
            accountId: "10",
            categoryId: "100",
            amount: "120",
            datetime: DateTime.fromISO("2023-05-10T13:22:12"),
            createdAt: DateTime.fromISO("2023-05-10T13:23:12"),
          },
          {
            type: TransactionType.expense,
            id: "3",
            title: "Transaction 3",
            accountId: "10",
            categoryId: "100",
            amount: "120",
            datetime: DateTime.fromISO("2023-05-10T13:22:12"),
            createdAt: DateTime.fromISO("2023-05-10T13:23:12"),
          },
        ],
      },
      {
        datetime: DateTime.fromISO("2023-05-09"),
        transactions: [
          {
            type: TransactionType.expense,
            id: "1",
            title: "Transaction 1",
            accountId: "10",
            categoryId: "100",
            amount: "120",
            datetime: DateTime.fromISO("2023-05-09T18:22:12"),
            createdAt: DateTime.fromISO("2023-05-09T18:23:12"),
          },
        ],
      },
    ]);
  });
});
