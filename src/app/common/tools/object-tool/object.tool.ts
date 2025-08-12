import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { ModelTool } from './models/model.tool';

export class ObjectTool {
  static model = new ModelTool();
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

  static copy<T>(data: T, type: ClassConstructor<T>, retains: string[] = []) {
    let retained = new Map<string, any>();
    if (retains.length > 0) {
      let _data = data as any;
      retains.forEach((key) => {
        if (_data[key] != undefined) {
          retained.set(key, _data[key]);
        }
      });
    }
    let plain = instanceToPlain(data);
    let copied = plainToInstance(type, plain);
    if (retained.size > 0) {
      for (const key in retained) {
        if (retained.has(key)) {
          (copied as any)[key] = retained.get(key);
        }
      }
    }
    return copied;
  }
}
