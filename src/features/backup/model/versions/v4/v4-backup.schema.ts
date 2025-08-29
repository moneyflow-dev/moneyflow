import { z } from "zod";

import { isUniqueArray } from "@shared/lib/itertools";
import { decimalRegex, positiveDecimalRegex } from "@shared/lib/regex";

import { validateV4BackupConsistency } from "./v4-backup.validator";

const v4ColorPickerColors = [
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
const v4CurrencySymbolPosition = ["left", "right"] as const;
const v4AccountIcon = [
  "cash",
  "card",
  "pig",
  "coins",
  "sackDollar",
  "landmark",
  "bitcoin",
] as const;
const v4UITextSize = ["small", "large"] as const;

const v4CurrencySchema = z.object({
  id: z.string().uuid(),
  symbol: z.string(),
  symbolPosition: z.enum(v4CurrencySymbolPosition),
  color: z.enum(v4ColorPickerColors),
  hasSpaceBetweenAmountAndSymbol: z.boolean(),
  hasGroupingNumbers: z.boolean(),
  precision: z.number().int().nonnegative(),
  createdAt: z.number().int().positive(),
});

const v4AccountSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  color: z.enum(v4ColorPickerColors),
  icon: z.enum(v4AccountIcon),
  initialBalance: z.string().regex(decimalRegex),
  currencyId: z.string().uuid(),
  createdAt: z.number().int().positive(),
});

const v4ExpenseCategorySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  parentId: z.string().uuid().nullable(),
  createdAt: z.number().int().positive(),
});

const v4ExpenseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v4IncomeCategorySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  parentId: z.string().uuid().nullable(),
  createdAt: z.number().int().positive(),
});

const v4IncomeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v4TransferAccount = z.object({
  accountId: z.string().uuid(),
  amount: z.string().regex(positiveDecimalRegex),
});

const v4TransferSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  fromAccount: v4TransferAccount,
  toAccount: v4TransferAccount,
  datetime: z.number().int().positive(),
  createdAt: z.number().int().positive(),
});

const v4NotificationsTimeSettingsSchema = z.object({
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
});

const v4NotificationsSettingsSchema = z.object({
  enabled: z.boolean(),
  time: v4NotificationsTimeSettingsSchema,
});

const v4AppearanceSettingsSchema = z.object({
  textSize: z.enum(v4UITextSize),
});

const v4SettingsSchema = z.object({
  notifications: v4NotificationsSettingsSchema,
  appearance: v4AppearanceSettingsSchema,
});

const v4BackupSchema = z.object({
  version: z.literal(4),
  currencies: z.object({
    order: z.array(z.string().uuid()).refine(isUniqueArray),
    currencies: z.record(z.string().uuid(), v4CurrencySchema),
  }),
  accounts: z.object({
    order: z.array(z.string().uuid()).refine(isUniqueArray),
    accounts: z.record(z.string().uuid(), v4AccountSchema),
  }),
  expenseCategories: z.record(z.string().uuid(), v4ExpenseCategorySchema),
  incomeCategories: z.record(z.string().uuid(), v4IncomeCategorySchema),
  expenses: z.record(z.string().uuid(), v4ExpenseSchema),
  incomes: z.record(z.string().uuid(), v4IncomeSchema),
  transfers: z.record(z.string().uuid(), v4TransferSchema),
  settings: v4SettingsSchema,
});

export const v4BackupConsistentSchema = v4BackupSchema.refine(
  validateV4BackupConsistency,
);

export type V4Backup = z.infer<typeof v4BackupSchema>;
