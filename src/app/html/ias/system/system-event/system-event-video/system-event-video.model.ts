export interface SystemEventVideoArgs<T = number> {
  channel?: T;
  duration?: number;
  rectified?: boolean;
  precision?: boolean;
}
