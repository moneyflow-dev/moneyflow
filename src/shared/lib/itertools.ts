export function isSubSet<T>(set1: Set<T>, set2: Set<T>): boolean {
  for (const item of set2) {
    if (!set1.has(item)) {
      return false;
    }
  }
  return true;
}

export function isEqualSet<T>(set1: Set<T>, set2: Set<T>): boolean {
  return set1.size === set2.size && isSubSet(set1, set2);
}

export function isUniqueArray<T>(array: T[]): boolean {
  return new Set(array).size === array.length;
}

export function* filter<T>(
  predicate: (v: T) => boolean,
  iterable: Iterable<T>,
): Iterable<T> {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

export function* map<T, R>(
  mapper: (v: T) => R,
  iterable: Iterable<T>,
): Iterable<R> {
  for (const item of iterable) {
    yield mapper(item);
  }
}
