import { assert, describe, it } from "vitest";

import { createCategoryString } from "./format";

describe("createCategoryString", () => {
  it("with depth 1", () => {
    const categories = { "1": { id: "1", title: "A", parentId: null } };
    const actual = createCategoryString(categories, "1");
    assert.strictEqual(actual, "A");
  });

  it("with depth 2", () => {
    const categories = {
      "1": { id: "1", title: "A", parentId: null },
      "2": { id: "2", title: "B", parentId: "1" },
    };
    const actual = createCategoryString(categories, "2");
    assert.strictEqual(actual, "A / B");
  });

  it("with depth 3 and custom delimiter", () => {
    const categories = {
      "1": { id: "1", title: "A", parentId: null },
      "2": { id: "2", title: "B", parentId: "1" },
      "3": { id: "3", title: "C", parentId: "2" },
    };
    const actual = createCategoryString(categories, "3");
    assert.strictEqual(actual, "A / B / C");
  });

  it("with depth 2 and nested categories for depth 2", () => {
    const categories = {
      "1": { id: "1", title: "A", parentId: null },
      "2": { id: "2", title: "B", parentId: "1" },
      "3": { id: "3", title: "C", parentId: "2" },
    };
    const actual = createCategoryString(categories, "2");
    assert.strictEqual(actual, "A / B");
  });
});
