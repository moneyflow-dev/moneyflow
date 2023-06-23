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
