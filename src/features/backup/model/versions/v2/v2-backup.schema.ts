import { z } from "zod";

import { isUniqueArray } from "@shared/lib/itertools";
import { decimalRegex, positiveDecimalRegex } from "@shared/lib/regex";

import { validateV2BackupConsistency } from "./v2-backup.validator";

const v2ColorPickerColors = [
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
const v2CurrencySymbolPosition = ["left", "right"] as const;
const v2AccountIcon = [
  "cash",
  "card",
  "pig",
  "coins",
  "sackDollar",
  "landmark",
  "bitcoin",
] as const;

const v2CurrencySchema = z.object({
  id: z.string().uuid(),
  symbol: z.string(),
  symbolPosition: z.enum(v2CurrencySymbolPosition),
  color: z.enum(v2ColorPickerColors),
  hasSpaceBetweenAmountAndSymbol: z.boolean(),
  precision: z.number().int().nonnegative(),
  createdAt: z.number().int().positive(),
});

const v2AccountSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  color: z.enum(v2ColorPickerColors),
  icon: z.enum(v2AccountIcon),
  initialBalance: z.string().regex(decimalRegex),
  currencyId: z.string().uuid(),
  createdAt: z.number().int().positive(),
});

const v2ExpenseCategorySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  parentId: z.string().uuid().nullable(),
  createdAt: z.number().int().positive(),
});

const v2ExpenseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v2IncomeCategorySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  parentId: z.string().uuid().nullable(),
  createdAt: z.number().int().positive(),
});

const v2IncomeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v2TransferAccount = z.object({
  accountId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
});

const v2TransferSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  fromAccount: v2TransferAccount,
  toAccount: v2TransferAccount,
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v2NotificationsTimeSettingsSchema = z.object({
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
});

const v2NotificationsSettingsSchema = z.object({
  enabled: z.boolean(),
  time: v2NotificationsTimeSettingsSchema,
});

const v2SettingsSchema = z.object({
  notifications: v2NotificationsSettingsSchema,
});

const v2BackupSchema = z.object({
  version: z.literal(2),
  currencies: z.object({
    order: z.array(z.string().uuid()).refine(isUniqueArray),
    currencies: z.record(z.string().uuid(), v2CurrencySchema),
  }),
  accounts: z.object({
    order: z.array(z.string().uuid()).refine(isUniqueArray),
    accounts: z.record(z.string().uuid(), v2AccountSchema),
  }),
  expenseCategories: z.record(z.string().uuid(), v2ExpenseCategorySchema),
  incomeCategories: z.record(z.string().uuid(), v2IncomeCategorySchema),
  expenses: z.record(z.string().uuid(), v2ExpenseSchema),
  incomes: z.record(z.string().uuid(), v2IncomeSchema),
  transfers: z.record(z.string().uuid(), v2TransferSchema),
  settings: v2SettingsSchema,
});

export const v2BackupConsistentSchema = v2BackupSchema.refine(
  validateV2BackupConsistency,
);

export type V2Backup = z.infer<typeof v2BackupSchema>;
