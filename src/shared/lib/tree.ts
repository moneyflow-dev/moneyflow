interface FlatNode<I> {
  id: I;
  parentId: I | null;
}

export interface TreeNode<I, T> {
  value: T;
  children: TreeNode<I, T>[];
  depth: number;
}

interface FlatTreeNode<T> {
  value: T;
  depth: number;
}

export const mapFlatToTree = <I, F extends FlatNode<I>>(
  nodes: F[],
  parentId: I | null,
  depth = 1,
): TreeNode<I, F>[] => {
  const subNodes = nodes.filter((node) => node.parentId === parentId);
  return subNodes.map((subNode) => ({
    value: subNode,
    children: mapFlatToTree(nodes, subNode.id, depth + 1),
    depth,
  }));
};

export const mapTreeToFlat = <I, F>(
  nodes: TreeNode<I, F>[],
): FlatTreeNode<F>[] => {
  return nodes.flatMap((node) => [
    {
      value: node.value,
      depth: node.depth,
    },
    ...mapTreeToFlat(node.children),
  ]);
};
