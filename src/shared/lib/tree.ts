interface FlatNode<I> {
  id: I;
  parentId: I | null;
}

interface TreeNodeValue<T> {
  id: T;
}

interface TreeNode<I, T extends TreeNodeValue<I>> {
  value: T;
  children: TreeNode<I, T>[];
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
