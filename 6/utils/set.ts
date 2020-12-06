export const union = <T>(sets: Set<T>[]) =>
  sets.reduce((all, group) => new Set([...all, ...group]), new Set<T>());

export const intersection = <T>(sets: Set<T>[]) =>
  sets.reduce(
    (intersection, set) => {
      if (intersection.size === 0) {
        return intersection;
      }

      return new Set(
        [...intersection].filter((a) => set.has(a)),
      );
    },
    sets[0],
  );
