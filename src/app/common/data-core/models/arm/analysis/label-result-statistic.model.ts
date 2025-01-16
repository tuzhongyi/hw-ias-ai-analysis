import { Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../../model.interface';
import { LabelResultStatisticItem } from './label-result-statistic-item.model';

/** 标注结果统计信息 */
export class LabelResultStatistic implements IModel {
  /**	LabelResultStatisticItem[]	标注统计结果列表	M */
  @Type(() => LabelResultStatisticItem)
  Items!: LabelResultStatisticItem[];
}
