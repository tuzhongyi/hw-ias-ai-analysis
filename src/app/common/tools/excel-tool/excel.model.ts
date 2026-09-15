import { ChartType } from '../chart-tool/chart.model';

/** Excel 图表中的一条系列 */
export interface IExcelChartSeries {
  /** 系列名称 */
  name: string;
  /** 纯色，如 '00F6FF' 或 'rgba(0,246,255,1)' */
  color?: string;
  /** 系列数据在数据表中的列索引（0 开始） */
  column: number;
}

/** 要写入 Excel 的图表（图表由数据表中的数据生成，修改数据会联动图表） */
export interface IExcelChart {
  /** 工作表名称 */
  name: string;
  /** 图表标题 */
  title: string;
  /** 图表类型 */
  type: ChartType;
  /** 横轴（分类）在数据表中的列索引（0 开始） */
  category: number;
  /** 系列 */
  series: IExcelChartSeries[];
}

/** 要写入 Excel 的数据表 */
export interface IExcelTable {
  /** 工作表名称 */
  name: string;
  /** 表格标题（写在表头之上，跨列合并显示） */
  title?: string;
  /** 表头 */
  columns: string[];
  /** 数据行（数值列使用数字，文本列使用字符串） */
  rows: (string | number)[][];
}

/** Excel 导出模型 */
export interface IExcelExportModel {
  /** 文件名（不含扩展名） */
  name: string;
  /** 数据表 */
  table: IExcelTable;
  /** 图表列表 */
  charts: IExcelChart[];
}
