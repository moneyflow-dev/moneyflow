import { it, assert, describe } from "vitest";

import { TreeNode, mapFlatToTree, mapTreeToFlat } from "./tree";

interface Node {
  id: string;
  parentId: string | null;
}

describe("mapFlatToTree", () => {
  it("with depth 3", () => {
    const nodes: Node[] = [
      { id: "1", parentId: null },
      { id: "2", parentId: null },
      { id: "3", parentId: "1" },
      { id: "4", parentId: "1" },
      { id: "5", parentId: "2" },
      { id: "6", parentId: "3" },
    ];
    const actual = mapFlatToTree<string, Node>(nodes, null);
    assert.deepEqual(actual, [
      {
        value: { id: "1", parentId: null },
        children: [
          {
            value: { id: "3", parentId: "1" },
            children: [
              { value: { id: "6", parentId: "3" }, children: [], depth: 3 },
            ],
            depth: 2,
          },
          { value: { id: "4", parentId: "1" }, children: [], depth: 2 },
        ],
        depth: 1,
      },
      {
        value: { id: "2", parentId: null },
        children: [
          { value: { id: "5", parentId: "2" }, children: [], depth: 2 },
        ],
        depth: 1,
      },
    ]);
  });

  it("with empty", () => {
    const nodes: Node[] = [];
    const actual = mapFlatToTree<string, Node>(nodes, null);
    assert.deepEqual(actual, []);
  });

  it("with no deeply nodes", () => {
    const nodes: Node[] = [
      { id: "1", parentId: null },
      { id: "2", parentId: null },
    ];
    const actual = mapFlatToTree<string, Node>(nodes, null);
    assert.deepEqual(actual, [
      { value: { id: "1", parentId: null }, children: [], depth: 1 },
      { value: { id: "2", parentId: null }, children: [], depth: 1 },
    ]);
  });
});

describe("mapTreeToFlat", () => {
  it("with depth 3", () => {
    const nodes: TreeNode<string, Node>[] = [
      {
        value: { id: "1", parentId: null },
        children: [
          {
            value: { id: "3", parentId: "1" },
            children: [
              { value: { id: "6", parentId: "3" }, children: [], depth: 3 },
            ],
            depth: 2,
          },
          { value: { id: "4", parentId: "1" }, children: [], depth: 2 },
        ],
        depth: 1,
      },
      {
        value: { id: "2", parentId: null },
        children: [
          { value: { id: "5", parentId: "2" }, children: [], depth: 2 },
        ],
        depth: 1,
      },
    ];

    const actual = mapTreeToFlat(nodes);
    assert.deepEqual(actual, [
      { value: { id: "1", parentId: null }, depth: 1 },
      { value: { id: "3", parentId: "1" }, depth: 2 },
      { value: { id: "6", parentId: "3" }, depth: 3 },
      { value: { id: "4", parentId: "1" }, depth: 2 },
      { value: { id: "2", parentId: null }, depth: 1 },
      { value: { id: "5", parentId: "2" }, depth: 2 },
    ]);
  });

  it("with depth 1", () => {
    const nodes: TreeNode<string, Node>[] = [
      {
        value: { id: "1", parentId: null },
        children: [],
        depth: 1,
      },
      {
        value: { id: "2", parentId: null },
        children: [],
        depth: 1,
      },
    ];

    const actual = mapTreeToFlat(nodes);
    assert.deepEqual(actual, [
      { value: { id: "1", parentId: null }, depth: 1 },
      { value: { id: "2", parentId: null }, depth: 1 },
    ]);
  });

  it("with empty", () => {
    const nodes: TreeNode<string, Node>[] = [];

    const actual = mapTreeToFlat(nodes);
    assert.deepEqual(actual, []);
  });
});
