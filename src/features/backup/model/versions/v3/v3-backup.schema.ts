import { z } from "zod";

import { isUniqueArray } from "@shared/lib/itertools";
import { decimalRegex, positiveDecimalRegex } from "@shared/lib/regex";

import { validateV3BackupConsistency } from "./v3-backup.validator";

const v3ColorPickerColors = [
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
const v3CurrencySymbolPosition = ["left", "right"] as const;
const v3AccountIcon = [
  "cash",
  "card",
  "pig",
  "coins",
  "sackDollar",
  "landmark",
  "bitcoin",
] as const;
const v3UITextSize = ["small", "large"] as const;

const v3CurrencySchema = z.object({
  id: z.string().uuid(),
  symbol: z.string(),
  symbolPosition: z.enum(v3CurrencySymbolPosition),
  color: z.enum(v3ColorPickerColors),
  hasSpaceBetweenAmountAndSymbol: z.boolean(),
  precision: z.number().int().nonnegative(),
  createdAt: z.number().int().positive(),
});

const v3AccountSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  color: z.enum(v3ColorPickerColors),
  icon: z.enum(v3AccountIcon),
  initialBalance: z.string().regex(decimalRegex),
  currencyId: z.string().uuid(),
  createdAt: z.number().int().positive(),
});

const v3ExpenseCategorySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  parentId: z.string().uuid().nullable(),
  createdAt: z.number().int().positive(),
});

const v3ExpenseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v3IncomeCategorySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  parentId: z.string().uuid().nullable(),
  createdAt: z.number().int().positive(),
});

const v3IncomeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v3TransferAccount = z.object({
  accountId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
});

const v3TransferSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  fromAccount: v3TransferAccount,
  toAccount: v3TransferAccount,
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v3NotificationsTimeSettingsSchema = z.object({
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
});

const v3NotificationsSettingsSchema = z.object({
  enabled: z.boolean(),
  time: v3NotificationsTimeSettingsSchema,
});

const v3AppearanceSettingsSchema = z.object({
  textSize: z.enum(v3UITextSize),
});

const v3SettingsSchema = z.object({
  notifications: v3NotificationsSettingsSchema,
  appearance: v3AppearanceSettingsSchema,
});

const v3BackupSchema = z.object({
  version: z.literal(3),
  currencies: z.object({
    order: z.array(z.string().uuid()).refine(isUniqueArray),
    currencies: z.record(z.string().uuid(), v3CurrencySchema),
  }),
  accounts: z.object({
    order: z.array(z.string().uuid()).refine(isUniqueArray),
    accounts: z.record(z.string().uuid(), v3AccountSchema),
  }),
  expenseCategories: z.record(z.string().uuid(), v3ExpenseCategorySchema),
  incomeCategories: z.record(z.string().uuid(), v3IncomeCategorySchema),
  expenses: z.record(z.string().uuid(), v3ExpenseSchema),
  incomes: z.record(z.string().uuid(), v3IncomeSchema),
  transfers: z.record(z.string().uuid(), v3TransferSchema),
  settings: v3SettingsSchema,
});

export const v3BackupConsistentSchema = v3BackupSchema.refine(
  validateV3BackupConsistency,
);

export type V3Backup = z.infer<typeof v3BackupSchema>;
