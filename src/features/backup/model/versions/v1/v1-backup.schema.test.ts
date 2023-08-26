import { describe, expect, it } from "vitest";

import { V1Backup, v1BackupConsistentSchema } from "./v1-backup.schema";

const nowDate = Date.now();

const currencyId1 = "f431410e-a274-4937-868e-a65c966365f3";
const currencyId2 = "ab8ffe29-9cc7-4f37-8ad8-01e2e0224a26";
const accountId1 = "87fbf3b4-1a13-4cae-a482-5e3e795a6404";
const accountId2 = "21d6d0a5-4783-4dd2-9995-4de6c2757f0c";
const expenseCategoryId1 = "4112cb98-e30c-4880-983f-710205b99185";
const expenseCategoryId2 = "cda9f2f6-8bb2-4f82-ad5d-35e20045ac63";
const incomeCategoryId1 = "12201382-d5e1-4664-8c43-0b5e867be308";
const incomeCategoryId2 = "d91df28d-ace2-4c30-b426-b0332d8d2894";
const expenseId1 = "92a3c62a-1b8b-46e3-b28d-45b0162ca560";
const expenseId2 = "b2b0b2a0-0b0e-4b0a-8b0a-5b0b0b0b0b0b";
const incomeId1 = "89312573-00b2-4623-b4d4-d6e605cb4d5c";
const incomeId2 = "577cf57d-6dd5-4e64-9927-0899ca3ef171";
const transferId1 = "036a70ef-a421-4cc5-ad6e-5a488cc68afd";
const transferId2 = "150d1d21-b4b4-43bd-8ee5-7655b23ae13b";

function generateBackup(): V1Backup {
  return {
    version: 1,
    currencies: {
      order: [currencyId1, currencyId2],
      currencies: {
        [currencyId1]: {
          id: currencyId1,
          symbol: "$",
          symbolPosition: "left",
          color: "lavender",
          hasSpaceBetweenAmountAndSymbol: false,
          createdAt: nowDate,
        },
        [currencyId2]: {
          id: currencyId2,
          symbol: "UAH",
          symbolPosition: "right",
          color: "green",
          hasSpaceBetweenAmountAndSymbol: true,
          createdAt: nowDate,
        },
      },
    },
    accounts: {
      order: [accountId1, accountId2],
      accounts: {
        [accountId1]: {
          id: accountId1,
          title: "Account 1",
          color: "lavender",
          icon: "cash",
          initialBalance: "0",
          currencyId: currencyId1,
          createdAt: nowDate,
        },
        [accountId2]: {
          id: accountId2,
          title: "Account 2",
          color: "lavender",
          icon: "cash",
          initialBalance: "0",
          currencyId: currencyId2,
          createdAt: nowDate,
        },
      },
    },
    expenseCategories: {
      [expenseCategoryId1]: {
        id: expenseCategoryId1,
        title: "Category 1",
        parentId: null,
        createdAt: nowDate,
      },
      [expenseCategoryId2]: {
        id: expenseCategoryId2,
        title: "Category 2",
        parentId: expenseCategoryId1,
        createdAt: nowDate,
      },
    },
    incomeCategories: {
      [incomeCategoryId1]: {
        id: incomeCategoryId1,
        title: "Category 1",
        parentId: null,
        createdAt: nowDate,
      },
      [incomeCategoryId2]: {
        id: incomeCategoryId2,
        title: "Category 2",
        parentId: incomeCategoryId1,
        createdAt: nowDate,
      },
    },
    expenses: {
      [expenseId1]: {
        id: expenseId1,
        title: "Expense 1",
        amount: "100",
        accountId: accountId1,
        categoryId: expenseCategoryId1,
        createdAt: nowDate,
        datetime: nowDate,
      },
      [expenseId2]: {
        id: expenseId2,
        title: "Expense 2",
        amount: "100",
        accountId: accountId2,
        categoryId: expenseCategoryId2,
        createdAt: nowDate,
        datetime: nowDate,
      },
    },
    incomes: {
      [incomeId1]: {
        id: incomeId1,
        title: "Income 1",
        amount: "100",
        accountId: accountId1,
        categoryId: incomeCategoryId1,
        createdAt: nowDate,
        datetime: nowDate,
      },
      [incomeId2]: {
        id: incomeId2,
        title: "Income 2",
        amount: "100",
        accountId: accountId2,
        categoryId: incomeCategoryId2,
        createdAt: nowDate,
        datetime: nowDate,
      },
    },
    transfers: {
      [transferId1]: {
        id: transferId1,
        title: "Transfer 1",
        fromAccount: {
          accountId: accountId1,
          amount: "100",
        },
        toAccount: {
          accountId: accountId2,
          amount: "100",
        },
        createdAt: nowDate,
        datetime: nowDate,
      },
      [transferId2]: {
        id: transferId2,
        title: "Transfer 2",
        fromAccount: {
          accountId: accountId2,
          amount: "100",
        },
        toAccount: {
          accountId: accountId1,
          amount: "100",
        },
        createdAt: nowDate,
        datetime: nowDate,
      },
    },
    settings: {
      notifications: { enabled: false, time: { hour: 21, minute: 0 } },
    },
  };
}

describe("v1 backup validation", () => {
  it("valid backup", () => {
    const backup = generateBackup();
    const { success } = v1BackupConsistentSchema.safeParse(backup);
    expect(success).toBe(true);
  });

  describe("version", () => {
    it("version is not number", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.version = "invalid";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("unsupported version", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.version = 2;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without version", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.version;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("version is integer", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.version = 1.1;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });
  });

  describe("currencies", () => {
    it("without currencies", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.currencies;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without order", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.currencies.order;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without currencies.currencies", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.currencies.currencies;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("unconsistent currencies order and keys", () => {
      const backup = generateBackup();
      backup.currencies.order = [currencyId1];
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("unconsistent currencies keys and values id", () => {
      const backup = generateBackup();
      backup.currencies.currencies[currencyId1].id =
        "08169cfe-a65f-44e4-af53-591e97c6216f";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without id", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.currencies.currencies[currencyId1].id;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without symbol", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.currencies.currencies[currencyId1].symbol;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without symbolPosition", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.currencies.currencies[currencyId1].symbolPosition;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without color", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.currencies.currencies[currencyId1].color;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without hasSpaceBetweenAmountAndSymbol", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.currencies.currencies[currencyId1]
        .hasSpaceBetweenAmountAndSymbol;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without createdAt", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.currencies.currencies[currencyId1].createdAt;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("symbolPosition is not enum", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.currencies.currencies[currencyId1].symbolPosition = "invalid";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("color is not enum", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.currencies.currencies[currencyId1].color = "invalid";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("hasSpaceBetweenAmountAndSymbol is not boolean", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.currencies.currencies[currencyId1].hasSpaceBetweenAmountAndSymbol =
        "invalid";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("createdAt is not timestamp", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.currencies.currencies[currencyId1].createdAt = "invalid";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });
  });

  describe("accounts", () => {
    it("unconsistent order id and keys", () => {
      const backup = generateBackup();
      backup.accounts.order = [accountId1];
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("unconsistent key and value id", () => {
      const backup = generateBackup();
      backup.accounts.accounts[accountId1].id =
        "348726a5-891b-45ba-a135-8ed29db456f7";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without order", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.accounts.order;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without accounts", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.accounts.accounts;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without id", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.accounts.accounts[accountId1].id;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without title", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.accounts.accounts[accountId1].title;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without color", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.accounts.accounts[accountId1].color;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without icon", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.accounts.accounts[accountId1].icon;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without initialBalance", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.accounts.accounts[accountId1].initialBalance;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without currencyId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.accounts.accounts[accountId1].currencyId;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without createdAt", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.accounts.accounts[accountId1].createdAt;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("color is not enum", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.accounts.accounts[accountId1].color = "invalidColor";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("icon is not enum", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.accounts.accounts[accountId1].icon = "invalidIcon";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("initialBalance is not decimal", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.accounts.accounts[accountId1].initialBalance = "invalidBalance";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("not existed currencyId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.accounts.accounts[accountId1].currencyId =
        "8d8d4046-1723-4ccd-a6bf-59e05c93ef6f";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });
  });

  describe("expenseCategories", () => {
    it("unconsistent key and value id", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.expenseCategories[expenseCategoryId1].id =
        "a7137164-7d85-4f7c-b6de-19df35445c2d";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("not existed parentId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.expenseCategories[expenseCategoryId2].parentId =
        "6fbfd39f-6b0c-4da4-a39e-f2fa6acb548d";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without expenseCategories", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenseCategories;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without id", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenseCategories[expenseCategoryId1].id;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without title", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenseCategories[expenseCategoryId1].title;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without parentId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenseCategories[expenseCategoryId1].parentId;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without createdAt", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenseCategories[expenseCategoryId1].createdAt;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });
  });

  describe("incomeCategories", () => {
    it("unconsistent key and value id", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.incomeCategories[incomeCategoryId1].id =
        "a7137164-7d85-4f7c-b6de-19df35445c2d";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("not existed parentId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.incomeCategories[incomeCategoryId2].parentId =
        "6fbfd39f-6b0c-4da4-a39e-f2fa6acb548d";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without incomeCategories", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomeCategories;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without id", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomeCategories[incomeCategoryId1].id;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without title", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomeCategories[incomeCategoryId1].title;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without parentId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomeCategories[incomeCategoryId1].parentId;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without createdAt", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomeCategories[incomeCategoryId1].createdAt;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });
  });

  describe("expenses", () => {
    it("unconsistent key and value id", () => {
      const backup = generateBackup();
      backup.expenses[expenseId1].id = "e5632761-c5f6-4ddf-a5d2-ed64a787f28e";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("not existed accountId", () => {
      const backup = generateBackup();
      backup.expenses[expenseId1].accountId =
        "1bd21840-46ee-4b56-8816-43a5fb7e4783";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("not existed categoryId", () => {
      const backup = generateBackup();
      backup.expenses[expenseId1].categoryId =
        "38a7a967-02f8-4934-8e36-974c263d309f";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without expenses", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenses;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without id", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenses[expenseId1].id;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without accountId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenses[expenseId1].accountId;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without categoryId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenses[expenseId1].categoryId;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without createdAt", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenses[expenseId1].createdAt;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without amount", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenses[expenseId1].amount;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without title", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenses[expenseId1].title;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without datetime", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.expenses[expenseId1].datetime;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("datetime is not timestamp", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.expenses[expenseId1].datetime = "invalidDatetime";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });
  });

  describe("incomes", () => {
    it("unconsistent key and value id", () => {
      const backup = generateBackup();
      backup.incomes[incomeId1].id = "e5632761-c5f6-4ddf-a5d2-ed64a787f28e";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("not existed accountId", () => {
      const backup = generateBackup();
      backup.incomes[incomeId1].accountId =
        "1bd21840-46ee-4b56-8816-43a5fb7e4783";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("not existed categoryId", () => {
      const backup = generateBackup();
      backup.incomes[incomeId1].categoryId =
        "38a7a967-02f8-4934-8e36-974c263d309f";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without incomes", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomes;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without id", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomes[incomeId1].id;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without accountId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomes[incomeId1].accountId;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without categoryId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomes[incomeId1].categoryId;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without createdAt", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomes[incomeId1].createdAt;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without amount", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomes[incomeId1].amount;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without title", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomes[incomeId1].title;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without datetime", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.incomes[incomeId1].datetime;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("datetime is not timestamp", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.incomes[incomeId1].datetime = "invalidDatetime";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });
  });

  describe("transfers", () => {
    it("unconsistent key and value id", () => {
      const backup = generateBackup();
      backup.transfers[transferId1].id = "e5632761-c5f6-4ddf-a5d2-ed64a787f28e";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("not existed fromAccount.accountId", () => {
      const backup = generateBackup();
      backup.transfers[transferId1].fromAccount.accountId =
        "8663b477-64d4-4f7e-af66-9930061e9a0b";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("not existed toAccount.accountId", () => {
      const backup = generateBackup();
      backup.transfers[transferId1].toAccount.accountId =
        "8f4fbd0f-dbfb-4753-b60e-f2b67d406e03";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without transfers", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.transfers;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without id", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.transfers[transferId1].id;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without fromAccount.accountId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.transfers[transferId1].fromAccount.accountId;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without fromAccount.amount", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.transfers[transferId1].fromAccount.amount;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without toAccount.accountId", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.transfers[transferId1].toAccount.accountId;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without toAccount.amount", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.transfers[transferId1].toAccount.amount;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without createdAt", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.transfers[transferId1].createdAt;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without title", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.transfers[transferId1].title;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without datetime", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.transfers[transferId1].datetime;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("datetime is not timestamp", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.transfers[transferId1].datetime = "invalidDatetime";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });
  });

  describe("settings", () => {
    it("without settings", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.settings;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without notifications", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.settings.notifications;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without notifications.enabled", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.settings.notifications.enabled;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without notifications.time", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.settings.notifications.time;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without notifications.time.hour", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.settings.notifications.time.hour;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("without notifications.time.minute", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      delete backup.settings.notifications.time.minute;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("notification.enabled is boolean", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.settings.notifications.enabled = "true";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("notification.time.hour is number", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.settings.notifications.time.hour = "21";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("notification.time.minute is number", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.settings.notifications.time.minute = "0";
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("notification.time.hour is lte 23", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.settings.notifications.time.hour = 24;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("notification.time.hour is gte 0", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.settings.notifications.time.hour = -1;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("notification.time.minute is lte 59", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.settings.notifications.time.minute = 60;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("notification.time.minute is gte 0", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.settings.notifications.time.minute = -1;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("notification.time.hour is integer", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.settings.notifications.time.hour = 21.5;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });

    it("notification.time.minute is integer", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup: any = generateBackup();
      backup.settings.notifications.time.minute = 0.5;
      const { success } = v1BackupConsistentSchema.safeParse(backup);
      expect(success).toBe(false);
    });
  });
});
