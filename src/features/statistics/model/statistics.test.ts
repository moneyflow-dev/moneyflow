import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";

import { AccountsMap } from "@entities/account";
import { Transaction } from "@entities/transaction";

import {
  AccountsForStatistics,
  CategoriesForStatistics,
  CurrenciesStatistics,
  TransactionForStatistics,
  getAccountBalance,
  getCurrencyBalance,
  getCurrenciesStatistics,
} from "./statistics";

// Account id          - x
// Expense id          - 1x
// Income id           - 2x
// Transfer id         - 3x
// Expense category id - 4x
// Income category id  - 5x
// Currency id         - 6x

describe("statistics", () => {
  const nowDate = DateTime.now();

  describe("getAccountBalance", () => {
    it("without transactions", () => {
      const actual = getAccountBalance("1", "10", []);
      expect(actual).toStrictEqual("10");
    });

    it("with one expense and matched account", () => {
      const transactions: Transaction[] = [
        {
          type: "expense",
          id: "10",
          amount: "10",
          title: "Expense 1",
          accountId: "1",
          categoryId: "40",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getAccountBalance("1", "0", transactions);
      expect(actual).toStrictEqual("-10");
    });

    it("with one income and matched account", () => {
      const transactions: Transaction[] = [
        {
          type: "income",
          id: "20",
          amount: "10",
          title: "Income 1",
          accountId: "1",
          categoryId: "50",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getAccountBalance("1", "0", transactions);
      expect(actual).toStrictEqual("10");
    });

    it("with one transfer and matched from account", () => {
      const transactions: Transaction[] = [
        {
          type: "transfer",
          id: "30",
          fromAccount: {
            accountId: "1",
            amount: "10",
          },
          toAccount: {
            accountId: "2",
            amount: "10",
          },
          title: "Transfer 1",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getAccountBalance("1", "0", transactions);
      expect(actual).toStrictEqual("-10");
    });

    it("with one transfer and matched to account", () => {
      const transactions: Transaction[] = [
        {
          type: "transfer",
          id: "30",
          fromAccount: {
            accountId: "2",
            amount: "10",
          },
          toAccount: {
            accountId: "1",
            amount: "10",
          },
          title: "Transfer 1",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getAccountBalance("1", "0", transactions);
      expect(actual).toStrictEqual("10");
    });

    it("with multiple transactions without account matching", () => {
      const transactions: Transaction[] = [
        {
          type: "expense",
          id: "10",
          amount: "10",
          title: "Expense 1",
          accountId: "1",
          categoryId: "40",
          createdAt: nowDate,
          datetime: nowDate,
        },
        {
          type: "income",
          id: "20",
          amount: "10",
          title: "Income 1",
          accountId: "1",
          categoryId: "50",
          createdAt: nowDate,
          datetime: nowDate,
        },
        {
          type: "transfer",
          id: "30",
          fromAccount: {
            accountId: "2",
            amount: "10",
          },
          toAccount: {
            accountId: "1",
            amount: "10",
          },
          title: "Transfer 1",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getAccountBalance("3", "0", transactions);
      expect(actual).toStrictEqual("0");
    });

    it("with multiple transactions with account matching", () => {
      const transactions: Transaction[] = [
        {
          type: "expense",
          id: "10",
          amount: "10",
          title: "Expense 1",
          accountId: "1",
          categoryId: "40",
          createdAt: nowDate,
          datetime: nowDate,
        },
        {
          type: "income",
          id: "20",
          amount: "20",
          title: "Income 1",
          accountId: "1",
          categoryId: "50",
          createdAt: nowDate,
          datetime: nowDate,
        },
        {
          type: "transfer",
          id: "30",
          fromAccount: {
            accountId: "2",
            amount: "10",
          },
          toAccount: {
            accountId: "1",
            amount: "10",
          },
          title: "Transfer 1",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getAccountBalance("1", "0", transactions);
      expect(actual).toStrictEqual("20");
    });
  });

  describe("getCurrencyBalance", () => {
    it("without transactions", () => {
      const accounts: AccountsMap = {
        "1": {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
          createdAt: nowDate,
        },
        "2": {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
          createdAt: nowDate,
        },
      };

      const actual = getCurrencyBalance("60", accounts, []);
      expect(actual).toStrictEqual("0");
    });

    it("with one expense and matched currency", () => {
      const accounts: AccountsMap = {
        "1": {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
          createdAt: nowDate,
        },
        "2": {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
          createdAt: nowDate,
        },
      };
      const transactions: Transaction[] = [
        {
          type: "expense",
          id: "10",
          amount: "10",
          title: "Expense 1",
          accountId: "1",
          categoryId: "40",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getCurrencyBalance("60", accounts, transactions);
      expect(actual).toStrictEqual("-10");
    });

    it("with one income and matched currency", () => {
      const accounts: AccountsMap = {
        "1": {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
          createdAt: nowDate,
        },
        "2": {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
          createdAt: nowDate,
        },
      };
      const transactions: Transaction[] = [
        {
          type: "income",
          id: "20",
          amount: "10",
          title: "Income 1",
          accountId: "1",
          categoryId: "40",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getCurrencyBalance("60", accounts, transactions);
      expect(actual).toStrictEqual("10");
    });

    it("with one transfer, matched from and to currencies and matched amount", () => {
      const accounts: AccountsMap = {
        "1": {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
          createdAt: nowDate,
        },
        "2": {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
          createdAt: nowDate,
        },
      };
      const transactions: Transaction[] = [
        {
          type: "transfer",
          id: "30",
          fromAccount: {
            accountId: "1",
            amount: "10",
          },
          toAccount: {
            accountId: "2",
            amount: "10",
          },
          title: "Transfer 1",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getCurrencyBalance("60", accounts, transactions);
      expect(actual).toStrictEqual("10");
    });

    it("with one transfer, matched from and to currencies and not matched amount", () => {
      const accounts: AccountsMap = {
        "1": {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
          createdAt: nowDate,
        },
        "2": {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
          createdAt: nowDate,
        },
      };
      const transactions: Transaction[] = [
        {
          type: "transfer",
          id: "30",
          fromAccount: {
            accountId: "1",
            amount: "10",
          },
          toAccount: {
            accountId: "2",
            amount: "8",
          },
          title: "Transfer 1",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getCurrencyBalance("60", accounts, transactions);
      expect(actual).toStrictEqual("8");
    });

    it("with one transfer and not matched from and to currencies", () => {
      const accounts: AccountsMap = {
        "1": {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
          createdAt: nowDate,
        },
        "2": {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
          createdAt: nowDate,
        },
      };
      const transactions: Transaction[] = [
        {
          type: "transfer",
          id: "30",
          fromAccount: {
            accountId: "1",
            amount: "10",
          },
          toAccount: {
            accountId: "2",
            amount: "1",
          },
          title: "Transfer 1",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const currency1Balance = getCurrencyBalance("60", accounts, transactions);
      expect(currency1Balance).toStrictEqual("0");

      const currency2Balance = getCurrencyBalance("61", accounts, transactions);
      expect(currency2Balance).toStrictEqual("1");
    });

    it("with multiple transactions and not matched currency", () => {
      const accounts: AccountsMap = {
        "1": {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
          createdAt: nowDate,
        },
        "2": {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
          createdAt: nowDate,
        },
      };
      const transactions: Transaction[] = [
        {
          type: "expense",
          id: "10",
          amount: "10",
          title: "Expense 1",
          accountId: "1",
          categoryId: "40",
          createdAt: nowDate,
          datetime: nowDate,
        },
        {
          type: "income",
          id: "20",
          amount: "20",
          title: "Income 1",
          accountId: "1",
          categoryId: "50",
          createdAt: nowDate,
          datetime: nowDate,
        },
        {
          type: "transfer",
          id: "30",
          fromAccount: {
            accountId: "2",
            amount: "10",
          },
          toAccount: {
            accountId: "1",
            amount: "10",
          },
          title: "Transfer 1",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getCurrencyBalance("62", accounts, transactions);
      expect(actual).toStrictEqual("0");
    });

    it("with multiple transactions and matched currency", () => {
      const accounts: AccountsMap = {
        "1": {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
          createdAt: nowDate,
        },
        "2": {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
          createdAt: nowDate,
        },
      };
      const transactions: Transaction[] = [
        {
          type: "expense",
          id: "10",
          amount: "10",
          title: "Expense 1",
          accountId: "1",
          categoryId: "40",
          createdAt: nowDate,
          datetime: nowDate,
        },
        {
          type: "income",
          id: "20",
          amount: "20",
          title: "Income 1",
          accountId: "1",
          categoryId: "50",
          createdAt: nowDate,
          datetime: nowDate,
        },
        {
          type: "transfer",
          id: "30",
          fromAccount: {
            accountId: "1",
            amount: "10",
          },
          toAccount: {
            accountId: "2",
            amount: "5",
          },
          title: "Transfer 1",
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const currency1Balance = getCurrencyBalance("60", accounts, transactions);
      expect(currency1Balance).toStrictEqual("10");

      const currency2Balance = getCurrencyBalance("61", accounts, transactions);
      expect(currency2Balance).toStrictEqual("5");
    });
  });

  describe("getCurrenciesStatistics", () => {
    const currencyId1 = "60";
    const currencyId2 = "61";
    const accountId1 = "1";
    const accountId2 = "2";
    const accountId3 = "3";
    const expenseCategoryId1 = "40";
    const expenseCategoryId2 = "41";
    const expenseCategoryId3 = "42";
    const expenseCategoryId4 = "43";
    const expenseCategoryId5 = "44";
    const incomeCategoryId1 = "50";
    const incomeCategoryId2 = "51";
    const incomeCategoryId3 = "52";
    const incomeCategoryId4 = "53";
    const incomeCategoryId5 = "54";

    const accounts: AccountsForStatistics = {
      [accountId1]: {
        currencyId: currencyId1,
      },
      [accountId2]: {
        currencyId: currencyId2,
      },
      [accountId3]: {
        currencyId: currencyId2,
      },
    };
    const expenseCategories: CategoriesForStatistics = {
      [expenseCategoryId1]: { id: expenseCategoryId1, parentId: null },
      [expenseCategoryId2]: {
        id: expenseCategoryId2,
        parentId: expenseCategoryId1,
      },
      [expenseCategoryId3]: {
        id: expenseCategoryId3,
        parentId: expenseCategoryId1,
      },
      [expenseCategoryId4]: {
        id: expenseCategoryId4,
        parentId: expenseCategoryId3,
      },
      [expenseCategoryId5]: { id: expenseCategoryId5, parentId: null },
    };
    const incomeCategories: CategoriesForStatistics = {
      [incomeCategoryId1]: { id: incomeCategoryId1, parentId: null },
      [incomeCategoryId2]: {
        id: incomeCategoryId2,
        parentId: incomeCategoryId1,
      },
      [incomeCategoryId3]: {
        id: incomeCategoryId3,
        parentId: incomeCategoryId1,
      },
      [incomeCategoryId4]: {
        id: incomeCategoryId4,
        parentId: incomeCategoryId3,
      },
      [incomeCategoryId5]: { id: incomeCategoryId5, parentId: null },
    };

    it("with empty transactions list", () => {
      const transactions: Transaction[] = [];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {};
      expect(actual).toStrictEqual(expected);
    });

    it("with one expense transaction", () => {
      const transactions: Transaction[] = [
        {
          type: "expense",
          id: "10",
          amount: "10",
          title: "Expense 1",
          accountId: accountId1,
          categoryId: expenseCategoryId1,
          createdAt: nowDate,
          datetime: nowDate,
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "0",
          expenseAmount: "10",
          expenseRootCategories: {
            totalAmount: "10",
            categories: [
              {
                categoryId: expenseCategoryId1,
                amount: "10",
                percentage: "100.00",
              },
            ],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with one income transaction", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "income",
          amount: "10",
          accountId: accountId1,
          categoryId: incomeCategoryId1,
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "10",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "10",
            categories: [
              {
                categoryId: incomeCategoryId1,
                amount: "10",
                percentage: "100.00",
              },
            ],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with one transfer transaction, not matched from and to accounts and matched amount and matched currencies", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "transfer",
          fromAccount: {
            accountId: accountId2,
            amount: "10",
          },
          toAccount: {
            accountId: accountId3,
            amount: "10",
          },
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId2]: {
          incomeAmount: "0",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with one transfer transaction, not matched from and to accounts and amount diff is positive and matched currencies", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "transfer",
          fromAccount: {
            accountId: accountId2,
            amount: "10",
          },
          toAccount: {
            accountId: accountId3,
            amount: "20",
          },
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId2]: {
          incomeAmount: "10",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with one transfer transaction, not matched from and to accounts and amount diff is negative and matched currencies", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "transfer",
          fromAccount: {
            accountId: accountId2,
            amount: "20",
          },
          toAccount: {
            accountId: accountId3,
            amount: "10",
          },
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId2]: {
          incomeAmount: "0",
          expenseAmount: "10",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with one transfer transaction, not matched from and to accounts and not matched amount and not matched currencies", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "transfer",
          fromAccount: {
            accountId: accountId1,
            amount: "10",
          },
          toAccount: {
            accountId: accountId2,
            amount: "8",
          },
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "0",
          expenseAmount: "10",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
        [currencyId2]: {
          incomeAmount: "8",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with one transfer transaction, not matched from and to accounts currencies", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "transfer",
          fromAccount: {
            accountId: accountId1,
            amount: "10",
          },
          toAccount: {
            accountId: accountId2,
            amount: "1",
          },
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "0",
          expenseAmount: "10",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
        [currencyId2]: {
          incomeAmount: "1",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with expense, income and transfer", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "expense",
          amount: "10",
          accountId: accountId1,
          categoryId: expenseCategoryId1,
        },
        {
          type: "income",
          amount: "20",
          accountId: accountId1,
          categoryId: incomeCategoryId1,
        },
        {
          type: "transfer",
          fromAccount: {
            accountId: accountId1,
            amount: "10",
          },
          toAccount: {
            accountId: accountId2,
            amount: "5",
          },
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "20",
          expenseAmount: "20",
          expenseRootCategories: {
            totalAmount: "10",
            categories: [
              {
                categoryId: expenseCategoryId1,
                amount: "10",
                percentage: "100.00",
              },
            ],
          },
          incomeRootCategories: {
            totalAmount: "20",
            categories: [
              {
                categoryId: incomeCategoryId1,
                amount: "20",
                percentage: "100.00",
              },
            ],
          },
        },
        [currencyId2]: {
          incomeAmount: "5",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with nested expense categories", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "expense",
          amount: "10",
          accountId: accountId1,
          categoryId: expenseCategoryId4,
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "0",
          expenseAmount: "10",
          expenseRootCategories: {
            totalAmount: "10",
            categories: [
              {
                categoryId: expenseCategoryId1,
                amount: "10",
                percentage: "100.00",
              },
            ],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with nested income categories", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "income",
          amount: "10",
          accountId: accountId1,
          categoryId: incomeCategoryId4,
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "10",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "10",
            categories: [
              {
                categoryId: incomeCategoryId1,
                amount: "10",
                percentage: "100.00",
              },
            ],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with multiple root expense categories", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "expense",
          amount: "10",
          accountId: accountId1,
          categoryId: expenseCategoryId1,
        },
        {
          type: "expense",
          amount: "10",
          accountId: accountId1,
          categoryId: expenseCategoryId5,
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "0",
          expenseAmount: "20",
          expenseRootCategories: {
            totalAmount: "20",
            categories: [
              {
                categoryId: expenseCategoryId1,
                amount: "10",
                percentage: "50.00",
              },
              {
                categoryId: expenseCategoryId5,
                amount: "10",
                percentage: "50.00",
              },
            ],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with multiple root income categories", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "income",
          amount: "10",
          accountId: accountId1,
          categoryId: incomeCategoryId1,
        },
        {
          type: "income",
          amount: "10",
          accountId: accountId1,
          categoryId: incomeCategoryId5,
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "20",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "20",
            categories: [
              {
                categoryId: incomeCategoryId1,
                amount: "10",
                percentage: "50.00",
              },
              {
                categoryId: incomeCategoryId5,
                amount: "10",
                percentage: "50.00",
              },
            ],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with multiple root expense categories and different currencies", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "expense",
          amount: "10",
          accountId: accountId1,
          categoryId: expenseCategoryId1,
        },
        {
          type: "expense",
          amount: "10",
          accountId: accountId2,
          categoryId: expenseCategoryId5,
        },
        {
          type: "expense",
          amount: "10",
          accountId: accountId3,
          categoryId: expenseCategoryId1,
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "0",
          expenseAmount: "10",
          expenseRootCategories: {
            totalAmount: "10",
            categories: [
              {
                categoryId: expenseCategoryId1,
                amount: "10",
                percentage: "100.00",
              },
            ],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
        [currencyId2]: {
          incomeAmount: "0",
          expenseAmount: "20",
          expenseRootCategories: {
            totalAmount: "20",
            categories: [
              {
                categoryId: expenseCategoryId1,
                amount: "10",
                percentage: "50.00",
              },
              {
                categoryId: expenseCategoryId5,
                amount: "10",
                percentage: "50.00",
              },
            ],
          },
          incomeRootCategories: {
            totalAmount: "0",
            categories: [],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });

    it("with multiple root income categories and different currencies", () => {
      const transactions: TransactionForStatistics[] = [
        {
          type: "income",
          amount: "10",
          accountId: accountId1,
          categoryId: incomeCategoryId1,
        },
        {
          type: "income",
          amount: "10",
          accountId: accountId2,
          categoryId: incomeCategoryId5,
        },
        {
          type: "income",
          amount: "10",
          accountId: accountId3,
          categoryId: incomeCategoryId1,
        },
      ];

      const actual = getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        transactions,
      );
      const expected: CurrenciesStatistics = {
        [currencyId1]: {
          incomeAmount: "10",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "10",
            categories: [
              {
                categoryId: incomeCategoryId1,
                amount: "10",
                percentage: "100.00",
              },
            ],
          },
        },
        [currencyId2]: {
          incomeAmount: "20",
          expenseAmount: "0",
          expenseRootCategories: {
            totalAmount: "0",
            categories: [],
          },
          incomeRootCategories: {
            totalAmount: "20",
            categories: [
              {
                categoryId: incomeCategoryId1,
                amount: "10",
                percentage: "50.00",
              },
              {
                categoryId: incomeCategoryId5,
                amount: "10",
                percentage: "50.00",
              },
            ],
          },
        },
      };
      expect(actual).toStrictEqual(expected);
    });
  });
});
