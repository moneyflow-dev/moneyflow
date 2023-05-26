import { DateTime } from "luxon";
import { assert, describe, it } from "vitest";

import { AccountIcon, AccountsMap } from "@entities/account";
import { ExpenseCategories, IncomeCategories } from "@entities/category";
import { Transaction, TransactionType } from "@entities/transaction";

import { ColorPickerColor } from "@shared/ui/color-pickers";

import { filterTransactions } from "./filter";

describe("filterTransactions", () => {
  const datetime = DateTime.now();
  const transactions: Transaction[] = [
    {
      type: "expense",
      id: "1",
      title: "",
      amount: "0",
      accountId: "10",
      categoryId: "100",
      createdAt: datetime,
      datetime,
    },
    {
      type: "expense",
      id: "2",
      title: "",
      amount: "0",
      accountId: "10",
      categoryId: "100",
      createdAt: datetime,
      datetime,
    },
    {
      type: "expense",
      id: "5",
      title: "",
      amount: "0",
      accountId: "12",
      categoryId: "100",
      createdAt: datetime,
      datetime,
    },
    {
      type: "income",
      id: "3",
      title: "",
      amount: "0",
      accountId: "10",
      categoryId: "100",
      createdAt: datetime,
      datetime,
    },
    {
      type: "transfer",
      id: "4",
      title: "",
      fromAccount: { accountId: "10", amount: "0" },
      toAccount: { accountId: "11", amount: "0" },
      createdAt: datetime,
      datetime,
    },
  ];
  const accounts: AccountsMap = {
    10: {
      id: "10",
      title: "",
      currencyId: "101",
      color: ColorPickerColor.red,
      icon: AccountIcon.pig,
      initialBalance: "0",
    },
    11: {
      id: "11",
      title: "",
      currencyId: "101",
      color: ColorPickerColor.red,
      icon: AccountIcon.pig,
      initialBalance: "0",
    },
    12: {
      id: "12",
      title: "",
      currencyId: "100",
      color: ColorPickerColor.red,
      icon: AccountIcon.pig,
      initialBalance: "0",
    },
  };
  const expenseCategories: ExpenseCategories = {
    100: {
      id: "100",
      title: "",
      parentId: "101",
    },
    101: {
      id: "101",
      title: "",
      parentId: null,
    },
  };
  const incomeCategories: IncomeCategories = {
    100: {
      id: "100",
      title: "",
      parentId: "101",
    },
    101: {
      id: "101",
      title: "",
      parentId: null,
    },
  };

  it("with empty transactions", () => {
    const actual = filterTransactions(
      [],
      {},
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, []);
  });

  it("without filters", () => {
    const actual = filterTransactions(
      transactions,
      {},
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, transactions);
  });

  it("by expense type", () => {
    const actual = filterTransactions(
      transactions,
      { type: TransactionType.expense },
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "1",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "2",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "5",
        title: "",
        amount: "0",
        accountId: "12",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by income type", () => {
    const actual = filterTransactions(
      transactions,
      { type: TransactionType.income },
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "income",
        id: "3",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by transfer type", () => {
    const actual = filterTransactions(
      transactions,
      { type: TransactionType.transfer },
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "transfer",
        id: "4",
        title: "",
        fromAccount: { accountId: "10", amount: "0" },
        toAccount: { accountId: "11", amount: "0" },
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by expense and transfer type", () => {
    const actual = filterTransactions(
      transactions,
      { type: [TransactionType.expense, TransactionType.transfer] },
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "1",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "2",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "5",
        title: "",
        amount: "0",
        accountId: "12",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "transfer",
        id: "4",
        title: "",
        fromAccount: { accountId: "10", amount: "0" },
        toAccount: { accountId: "11", amount: "0" },
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by not existed accountId", () => {
    const actual = filterTransactions(
      transactions,
      { accountId: "0" },
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, []);
  });

  it("by accountId", () => {
    const actual = filterTransactions(
      transactions,
      { accountId: "12" },
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "5",
        title: "",
        amount: "0",
        accountId: "12",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by multiple accountIds", () => {
    const actual = filterTransactions(
      transactions,
      { accountId: ["12", "11"] },
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "5",
        title: "",
        amount: "0",
        accountId: "12",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "transfer",
        id: "4",
        title: "",
        fromAccount: { accountId: "10", amount: "0" },
        toAccount: { accountId: "11", amount: "0" },
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by accountId", () => {
    const actual = filterTransactions(
      transactions,
      { accountId: "10" },
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "1",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "2",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "income",
        id: "3",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "transfer",
        id: "4",
        title: "",
        fromAccount: { accountId: "10", amount: "0" },
        toAccount: { accountId: "11", amount: "0" },
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by accountId in transfer", () => {
    const actual = filterTransactions(
      transactions,
      { accountId: "11" },
      {},
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "transfer",
        id: "4",
        title: "",
        fromAccount: { accountId: "10", amount: "0" },
        toAccount: { accountId: "11", amount: "0" },
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by not existed currencyId", () => {
    const actual = filterTransactions(
      transactions,
      { currencyId: "110" },
      accounts,
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, []);
  });

  it("by currencyId which one expense has", () => {
    const actual = filterTransactions(
      transactions,
      { currencyId: "100" },
      accounts,
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "5",
        title: "",
        amount: "0",
        accountId: "12",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by currencyId which multiple transactions has", () => {
    const actual = filterTransactions(
      transactions,
      { currencyId: "101" },
      accounts,
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "1",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "2",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "income",
        id: "3",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "transfer",
        id: "4",
        title: "",
        fromAccount: { accountId: "10", amount: "0" },
        toAccount: { accountId: "11", amount: "0" },
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by multiple currencyIds", () => {
    const actual = filterTransactions(
      transactions,
      { currencyId: ["100", "101"] },
      accounts,
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, transactions);
  });

  it("by expenseCategoryId", () => {
    const actual = filterTransactions(
      transactions,
      { expenseCategoryId: "100" },
      accounts,
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "1",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "2",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "5",
        title: "",
        amount: "0",
        accountId: "12",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by incomeCategoryId", () => {
    const actual = filterTransactions(
      transactions,
      { incomeCategoryId: "100" },
      accounts,
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "income",
        id: "3",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by expense type and accountId", () => {
    const actual = filterTransactions(
      transactions,
      { type: TransactionType.expense, accountId: "10" },
      accounts,
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "1",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "2",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by parent expense category", () => {
    const actual = filterTransactions(
      transactions,
      { expenseCategoryId: "101" },
      accounts,
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "expense",
        id: "1",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "2",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
      {
        type: "expense",
        id: "5",
        title: "",
        amount: "0",
        accountId: "12",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("by parent income category", () => {
    const actual = filterTransactions(
      transactions,
      { incomeCategoryId: "101" },
      accounts,
      expenseCategories,
      incomeCategories,
    );
    assert.deepEqual(actual, [
      {
        type: "income",
        id: "3",
        title: "",
        amount: "0",
        accountId: "10",
        categoryId: "100",
        createdAt: datetime,
        datetime,
      },
    ]);
  });

  it("from specific datetime", () => {
    const actual = filterTransactions(
      transactions,
      {
        fromDateTimeRange: DateTime.local(2000, 12, 12, 12, 12, 12),
      },
      accounts,
      expenseCategories,
      incomeCategories,
    );

    assert.deepEqual(actual, transactions);
  });

  it("from specific future datetime", () => {
    const actual = filterTransactions(
      transactions,
      {
        fromDateTimeRange: DateTime.local(2100, 12, 12, 12, 12, 12),
      },
      accounts,
      expenseCategories,
      incomeCategories,
    );

    assert.deepEqual(actual, []);
  });

  it("to specific datetime", () => {
    const actual = filterTransactions(
      transactions,
      {
        toDateTimeRange: DateTime.local(2100, 12, 12, 12, 12, 12),
      },
      accounts,
      expenseCategories,
      incomeCategories,
    );

    assert.deepEqual(actual, transactions);
  });
});
