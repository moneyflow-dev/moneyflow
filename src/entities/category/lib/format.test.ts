import { DateTime } from "luxon";
import { assert, describe, it } from "vitest";

import { createCategoryString } from "./format";

describe("createCategoryString", () => {
  const nowDate = DateTime.now();

  it("with depth 1", () => {
    const categories = {
      "1": { id: "1", title: "A", parentId: null, createdAt: nowDate },
    };
    const actual = createCategoryString(categories, "1");
    assert.strictEqual(actual, "A");
  });

  it("with depth 2", () => {
    const categories = {
      "1": { id: "1", title: "A", parentId: null, createdAt: nowDate },
      "2": { id: "2", title: "B", parentId: "1", createdAt: nowDate },
    };
    const actual = createCategoryString(categories, "2");
    assert.strictEqual(actual, "A / B");
  });

  it("with depth 3 and custom delimiter", () => {
    const categories = {
      "1": { id: "1", title: "A", parentId: null, createdAt: nowDate },
      "2": { id: "2", title: "B", parentId: "1", createdAt: nowDate },
      "3": { id: "3", title: "C", parentId: "2", createdAt: nowDate },
    };
    const actual = createCategoryString(categories, "3", " | ");
    assert.strictEqual(actual, "A | B | C");
  });

  it("with depth 2 and nested categories for depth 2", () => {
    const categories = {
      "1": { id: "1", title: "A", parentId: null, createdAt: nowDate },
      "2": { id: "2", title: "B", parentId: "1", createdAt: nowDate },
      "3": { id: "3", title: "C", parentId: "2", createdAt: nowDate },
    };
    const actual = createCategoryString(categories, "2");
    assert.strictEqual(actual, "A / B");
  });
});
