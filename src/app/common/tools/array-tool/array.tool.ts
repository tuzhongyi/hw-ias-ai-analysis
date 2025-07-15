export class ArrayTool {
  /** 寻找最近值 */
  static closest(
    arr: number[],
    target: number
  ): { index: number; value: number } | undefined {
    if (arr.length === 0) return undefined;
    let index = 0;
    let closest = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (Math.abs(arr[i] - target) < Math.abs(closest - target)) {
        closest = arr[i];
        index = i;
      }
    }
    return {
      index: index,
      value: closest,
    };
  }
  /** 分组 */
  static groupBy<T>(array: T[], fn: (item: T) => string): Record<string, T[]> {
    let result = array.reduce((data: any, item) => {
      const key = fn(item);
      if (!data[key]) {
        data[key] = [];
      }
      data[key].push(item);
      return data;
    }, {});
    return result;
    // return Object.values(result);
  }
  /** 去重 */
  static distinct<T>(datas: T[], nullable = true) {
    let items: T[] = [...datas];
    if (!nullable) {
      items = datas.filter((x) => x !== null && x !== undefined);
    }

    return Array.from(new Set<T>(items));
  }

  static compare<T>(a: T[], b: T[], comparator: (a: T, b: T) => boolean) {
    const duplicates: T[] = [];
    const uniqueInA: T[] = [];
    const uniqueInB: T[] = [];

    a.forEach((itemA) => {
      const foundInB = b.some((itemB) => comparator(itemA, itemB));
      if (foundInB) {
        duplicates.push(itemA);
      } else {
        uniqueInA.push(itemA);
      }
    });

    b.forEach((itemB) => {
      const foundInA = a.some((itemA) => comparator(itemA, itemB));
      if (!foundInA) {
        uniqueInB.push(itemB);
      }
    });

    return { duplicates, uniqueInA, uniqueInB };
  }
}
