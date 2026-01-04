import { IIdNameModel } from '../../data-core/models/model.interface';

export interface ChartItem<T = number> {
  id: T;
  name: string;
  value: number;
}
export interface ITimeData<T> {
  time: Date;
  value: T;
  index?: number;
}
export interface IChartColor {
  area?: string | echarts.graphic.LinearGradient;
  line: string | echarts.graphic.LinearGradient;
  point?: {
    border: string;
    background?: string;
  };
}
export interface IChartData<TValue = number, TId = string>
  extends IIdNameModel<TId> {
  color?: IChartColor;
  unit?: string;
  datas: ITimeData<TValue>[];
  format?: (value: TValue) => string;
}
export enum ChartType {
  bar,
  line,
}
