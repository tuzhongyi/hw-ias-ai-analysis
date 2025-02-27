export class ObjectTool {
  static keys(obj: Object, opts: 'porperty' | 'value' | 'all' = 'all') {
    let keys: string[];
    if (opts === 'porperty') {
      keys = [];
    } else if (opts === 'value') {
      keys = Object.keys(obj);
      return keys;
    } else {
      keys = Object.keys(obj);
    }

    let property = Object.getPrototypeOf(obj);
    for (const name of Object.getOwnPropertyNames(property)) {
      if (name === 'constructor') {
        continue;
      }
      keys.push(name);
    }
    return keys;
  }
}
