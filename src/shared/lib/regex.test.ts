import { it, describe, expect } from "vitest";

import { numbersGroupingRegex } from "./regex";

describe("numbersGroupingRegex", () => {
  it("int numbers", () => {
    it("should match numbers with thousands separators", () => {
      expect("123456789".replace(numbersGroupingRegex, ",")).toBe(
        "123,456,789",
      );
    });

    it("should not match numbers less than four digits", () => {
      expect("123".replace(numbersGroupingRegex, ",")).toBe("123");
    });
  });

  it("float numbers", () => {
    it("should match numbers with thousands separators", () => {
      expect("123456789.01".replace(numbersGroupingRegex, ",")).toBe(
        "123,456,789.01",
      );
    });

    it("should not match numbers less than four digits", () => {
      expect("123.01".replace(numbersGroupingRegex, ",")).toBe("123.01");
    });
  });
});
