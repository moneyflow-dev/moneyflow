import { describe, expect, it } from "vitest";

import {
  InvalidPrecisionError,
  createCurrencyAmountString,
  formatAmountPrecision,
} from "./lib";

describe("currency entity lib", () => {
  describe("createCurrencyAmountString", () => {
    it("positive number, left symbol position, without space", () => {
      const actual = createCurrencyAmountString({
        currency: {
          symbol: "$",
          symbolPosition: "left",
          hasSpaceBetweenAmountAndSymbol: false,
        },
        amount: "15.8",
      });
      expect(actual).toBe("$15.8");
    });

    it("positive number, right symbol position, without space", () => {
      const actual = createCurrencyAmountString({
        currency: {
          symbol: "$",
          symbolPosition: "right",
          hasSpaceBetweenAmountAndSymbol: false,
        },
        amount: "15.8",
      });
      expect(actual).toBe("15.8$");
    });

    it("positive number, left symbol position, with space", () => {
      const actual = createCurrencyAmountString({
        currency: {
          symbol: "$",
          symbolPosition: "left",
          hasSpaceBetweenAmountAndSymbol: true,
        },
        amount: "15.8",
      });
      expect(actual).toBe("$ 15.8");
    });

    it("positive number, right symbol position, with space", () => {
      const actual = createCurrencyAmountString({
        currency: {
          symbol: "$",
          symbolPosition: "right",
          hasSpaceBetweenAmountAndSymbol: true,
        },
        amount: "15.8",
      });
      expect(actual).toBe("15.8 $");
    });

    it("negative number, left symbol position, without space", () => {
      const actual = createCurrencyAmountString({
        currency: {
          symbol: "$",
          symbolPosition: "left",
          hasSpaceBetweenAmountAndSymbol: false,
        },
        amount: "-15.8",
      });
      expect(actual).toBe("-$15.8");
    });

    it("negative number, right symbol position, without space", () => {
      const actual = createCurrencyAmountString({
        currency: {
          symbol: "$",
          symbolPosition: "right",
          hasSpaceBetweenAmountAndSymbol: false,
        },
        amount: "-15.8",
      });
      expect(actual).toBe("-15.8$");
    });

    it("negative number, left symbol position, with space", () => {
      const actual = createCurrencyAmountString({
        currency: {
          symbol: "$",
          symbolPosition: "left",
          hasSpaceBetweenAmountAndSymbol: true,
        },
        amount: "-15.8",
      });
      expect(actual).toBe("-$ 15.8");
    });

    it("negative number, right symbol position, with space", () => {
      const actual = createCurrencyAmountString({
        currency: {
          symbol: "$",
          symbolPosition: "right",
          hasSpaceBetweenAmountAndSymbol: true,
        },
        amount: "-15.8",
      });
      expect(actual).toBe("-15.8 $");
    });
  });

  describe("formatAmountPrecision", () => {
    it("precision is 0", () => {
      const actual = formatAmountPrecision("15.8", 0);
      expect(actual).toBe("15");
    });

    it("precision is 1", () => {
      const actual = formatAmountPrecision("15.8", 1);
      expect(actual).toBe("15.8");
    });

    it("precision is 2 and number precision is 1", () => {
      const actual = formatAmountPrecision("15.8", 2);
      expect(actual).toBe("15.8");
    });

    it("precision is 2 and number precision is 4", () => {
      const actual = formatAmountPrecision("15.8123", 2);
      expect(actual).toBe("15.81");
    });

    it("precision is 1, negative number", () => {
      const actual = formatAmountPrecision("-15.8", 1);
      expect(actual).toBe("-15.8");
    });

    it("should throw error on non integer precision", () => {
      expect(() => formatAmountPrecision("15.8", 1.1)).toThrowError(
        InvalidPrecisionError,
      );
    });

    it("should throw error on negative precision", () => {
      expect(() => formatAmountPrecision("15.8", -1)).toThrowError(
        InvalidPrecisionError,
      );
    });

    it("should round down with odd number", () => {
      const actual = formatAmountPrecision("15.8", 0);
      expect(actual).toBe("15");
    });

    it("should round down with even number", () => {
      const actual = formatAmountPrecision("16.8", 0);
      expect(actual).toBe("16");
    });

    it("should round down with negative even number", () => {
      const actual = formatAmountPrecision("-16.8", 0);
      expect(actual).toBe("-16");
    });

    it("should round down with negative odd number", () => {
      const actual = formatAmountPrecision("-15.8", 0);
      expect(actual).toBe("-15");
    });

    it("should round down with negative odd number with decimal digit less than 5", () => {
      const actual = formatAmountPrecision("-15.4", 0);
      expect(actual).toBe("-15");
    });
  });
});
