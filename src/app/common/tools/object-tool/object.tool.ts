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

  static clone<T>(target: T, weakMap = new WeakMap()): T {
    // 处理 null 和 基础类型
    if (target === null || typeof target !== 'object') {
      return target;
    }

    // 避免循环引用
    if (weakMap.has(target as object)) {
      return weakMap.get(target as object);
    }

    let clone: any;

    // 处理 Date
    if (target instanceof Date) {
      clone = new Date(target);
      return clone as T;
    }

    // 处理 RegExp
    if (target instanceof RegExp) {
      clone = new RegExp(target.source, target.flags);
      return clone as T;
    }

    // 处理 Map
    if (target instanceof Map) {
      clone = new Map();
      weakMap.set(target, clone);
      target.forEach((value, key) => {
        clone.set(key, this.clone(value, weakMap));
      });
      return clone as T;
    }

    // 处理 Set
    if (target instanceof Set) {
      clone = new Set();
      weakMap.set(target, clone);
      target.forEach((value) => {
        clone.add(this.clone(value, weakMap));
      });
      return clone as T;
    }

    // 处理数组和普通对象
    clone = Array.isArray(target) ? [] : {};
    weakMap.set(target, clone);

    Object.keys(target as object).forEach((key) => {
      (clone as any)[key] = this.clone((target as any)[key], weakMap);
    });

    return clone as T;
  }
}
