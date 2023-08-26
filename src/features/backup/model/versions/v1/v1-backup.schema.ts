import { z } from "zod";

import { isUniqueArray } from "@shared/lib/itertools";
import { decimalRegex, positiveDecimalRegex } from "@shared/lib/regex";

import { validateV1BackupConsistency } from "./v1-backup.validator";
const v1ColorPickerColors = [
  "yellow",
  "peach",
  "green",
  "lavender",
  "mauve",
  "blue",
  "sapphire",
  "sky",
  "teal",
  "maroon",
  "red",
  "pink",
  "flamingo",
  "rosewater",
] as const;
const v1CurrencySymbolPosition = ["left", "right"] as const;
const v1AccountIcon = [
  "cash",
  "card",
  "pig",
  "coins",
  "sackDollar",
  "landmark",
  "bitcoin",
] as const;

const v1CurrencySchema = z.object({
  id: z.string().uuid(),
  symbol: z.string(),
  symbolPosition: z.enum(v1CurrencySymbolPosition),
  color: z.enum(v1ColorPickerColors),
  hasSpaceBetweenAmountAndSymbol: z.boolean(),
  createdAt: z.number().int().positive(),
});

const v1AccountSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  color: z.enum(v1ColorPickerColors),
  icon: z.enum(v1AccountIcon),
  initialBalance: z.string().regex(decimalRegex),
  currencyId: z.string().uuid(),
  createdAt: z.number().int().positive(),
});

const v1ExpenseCategorySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  parentId: z.string().uuid().nullable(),
  createdAt: z.number().int().positive(),
});

const v1ExpenseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v1IncomeCategorySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  parentId: z.string().uuid().nullable(),
  createdAt: z.number().int().positive(),
});

const v1IncomeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v1TransferAccount = z.object({
  accountId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
});

const v1TransferSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  fromAccount: v1TransferAccount,
  toAccount: v1TransferAccount,
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v1NotificationsTimeSettingsSchema = z.object({
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
});

const v1NotificationsSettingsSchema = z.object({
  enabled: z.boolean(),
  time: v1NotificationsTimeSettingsSchema,
});

const v1SettingsSchema = z.object({
  notifications: v1NotificationsSettingsSchema,
});

const v1BackupSchema = z.object({
  version: z.literal(1),
  currencies: z.object({
    order: z.array(z.string().uuid()).refine(isUniqueArray),
    currencies: z.record(z.string().uuid(), v1CurrencySchema),
  }),
  accounts: z.object({
    order: z.array(z.string().uuid()).refine(isUniqueArray),
    accounts: z.record(z.string().uuid(), v1AccountSchema),
  }),
  expenseCategories: z.record(z.string().uuid(), v1ExpenseCategorySchema),
  incomeCategories: z.record(z.string().uuid(), v1IncomeCategorySchema),
  expenses: z.record(z.string().uuid(), v1ExpenseSchema),
  incomes: z.record(z.string().uuid(), v1IncomeSchema),
  transfers: z.record(z.string().uuid(), v1TransferSchema),
  settings: v1SettingsSchema,
});

export const v1BackupConsistentSchema = v1BackupSchema.refine(
  validateV1BackupConsistency,
);

export type V1Backup = z.infer<typeof v1BackupSchema>;
