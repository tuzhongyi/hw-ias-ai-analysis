import { EventEmitter } from '@angular/core';
import { Paged } from '../../../../../common/data-core/models/page-list.model';

export interface SystemMainMapAlarmInfoInput<T> {
  data?: T;
  color: 'red' | 'orange';
}
export interface SystemMainMapAlarmInfoOutput<T> {
  close: EventEmitter<void>;
  video: EventEmitter<T>;
  image: EventEmitter<Paged<T>>;
}
