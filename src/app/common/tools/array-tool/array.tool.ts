interface ArrayItem {
  index: number;
  value: number;
}
export class ArrayTool {
  /** 寻找最近值 */
  static closest = {
    item: (arr: number[], target: number): ArrayItem | undefined => {
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
    },
    between: (
      arr: number[],
      target: number
    ): { left: ArrayItem; right: ArrayItem; percent: number } | undefined => {
      {
        if (arr.length < 2) return undefined;
        // target 在最左侧
        if (target <= arr[0]) {
          return {
            left: { index: 0, value: arr[0] },
            right: { index: 1, value: arr[1] },
            percent: 0,
          };
        }

        // target 在最右侧
        const last = arr.length - 1;
        if (target >= arr[last]) {
          return {
            left: { index: last - 1, value: arr[last - 1] },
            right: { index: last, value: arr[last] },
            percent: 1,
          };
        }

        // 正常区间
        for (let i = 0; i < arr.length - 1; i++) {
          const leftValue = arr[i];
          const rightValue = arr[i + 1];

          if (target >= leftValue && target <= rightValue) {
            const percent =
              rightValue === leftValue
                ? 0
                : (target - leftValue) / (rightValue - leftValue);

            return {
              left: { index: i, value: leftValue },
              right: { index: i + 1, value: rightValue },
              percent,
            };
          }
        }

        return undefined;
      }
    },
  };

  /** 分组 */
  static groupBy<TData, TKey extends keyof any = string>(
    array: TData[],
    fn: (item: TData) => TKey
  ): Record<TKey, TData[]> {
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

  static buffer = {
    from: {
      string: (str: string): ArrayBuffer => {
        let encoder = new TextEncoder();
        return encoder.encode(str).buffer;
        // var bytes = new Array();
        // var len, c;
        // len = str.length;
        // for (var i = 0; i < len; i++) {
        //   c = str.charCodeAt(i);
        //   if (c >= 0x010000 && c <= 0x10ffff) {
        //     bytes.push(((c >> 18) & 0x07) | 0xf0);
        //     bytes.push(((c >> 12) & 0x3f) | 0x80);
        //     bytes.push(((c >> 6) & 0x3f) | 0x80);
        //     bytes.push((c & 0x3f) | 0x80);
        //   } else if (c >= 0x000800 && c <= 0x00ffff) {
        //     bytes.push(((c >> 12) & 0x0f) | 0xe0);
        //     bytes.push(((c >> 6) & 0x3f) | 0x80);
        //     bytes.push((c & 0x3f) | 0x80);
        //   } else if (c >= 0x000080 && c <= 0x0007ff) {
        //     bytes.push(((c >> 6) & 0x1f) | 0xc0);
        //     bytes.push((c & 0x3f) | 0x80);
        //   } else {
        //     bytes.push(c & 0xff);
        //   }
        // }
        // var array = new Int8Array(bytes.length);
        // for (var i = 0; i <= bytes.length; i++) {
        //   array[i] = bytes[i];
        // }
        // return array.buffer;
      },
    },
  };
}
