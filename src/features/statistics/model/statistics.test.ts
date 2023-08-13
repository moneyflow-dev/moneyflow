import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";

import { Account } from "@entities/account";
import { Transaction } from "@entities/transaction";

import { getAccountBalance, getCurrencyBalance } from "./statistics";

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
      const accounts: Account[] = [
        {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
        },
        {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
        },
      ];

      const actual = getCurrencyBalance("60", accounts, []);
      expect(actual).toStrictEqual("0");
    });

    it("with one expense and matched currency", () => {
      const accounts: Account[] = [
        {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
        },
        {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
        },
      ];
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
      const accounts: Account[] = [
        {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
        },
        {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
        },
      ];
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
      const accounts: Account[] = [
        {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
        },
        {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
        },
      ];
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
      const accounts: Account[] = [
        {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
        },
        {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
        },
      ];
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
      const accounts: Account[] = [
        {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
        },
        {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
        },
      ];
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
      const accounts: Account[] = [
        {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
        },
        {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "60",
        },
      ];
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
      const accounts: Account[] = [
        {
          id: "1",
          title: "Account 1",
          color: "peach",
          icon: "cash",
          initialBalance: "10",
          currencyId: "60",
        },
        {
          id: "2",
          title: "Account 2",
          color: "peach",
          icon: "cash",
          initialBalance: "0",
          currencyId: "61",
        },
      ];
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
});
