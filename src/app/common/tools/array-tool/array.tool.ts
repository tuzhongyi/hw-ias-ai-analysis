export class ArrayTool {
  static closest(
    arr: number[],
    target: number
  ): { index: number; value: number } | undefined {
    if (arr.length === 0) return undefined
    let index = 0
    let closest = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (Math.abs(arr[i] - target) < Math.abs(closest - target)) {
        closest = arr[i]
        index = i
      }
    }
    return {
      index: index,
      value: closest,
    }
  }
}
