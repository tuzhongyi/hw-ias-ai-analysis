import * as FileSaver from 'file-saver';
import { strToU8, zipSync } from 'fflate';
import { ChartType } from '../chart-tool/chart.model';
import {
  IExcelChart,
  IExcelExportModel,
  IExcelTable,
} from './excel.model';

/**
 * Excel 工具类：把数据表与图表导出为 .xlsx 文件。
 * 图表为原生 Excel 图表（bar/line），直接引用数据表中的单元格，
 * 因此修改数据后图表会随之更新，而不是一张静态图片。
 */
export class ExcelTool {
  static export(model: IExcelExportModel) {
    let parts = ExcelTool.parts(model);
    let files: Record<string, Uint8Array> = {};
    for (let key in parts) {
      files[key] = strToU8(parts[key]);
    }
    let zip = zipSync(files);
    let blob = new Blob([zip], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    FileSaver.saveAs(blob, `${model.name}.xlsx`);
  }

  private static parts(model: IExcelExportModel): Record<string, string> {
    let sheets = [model.table.name, ...model.charts.map((x) => x.name)];
    let result: Record<string, string> = {
      '[Content_Types].xml': ExcelTool.contentTypes(sheets.length, model.charts.length),
      '_rels/.rels': ExcelTool.rootRels(),
      'docProps/core.xml': ExcelTool.core(model.name),
      'docProps/app.xml': ExcelTool.app(),
      'xl/workbook.xml': ExcelTool.workbook(sheets),
      'xl/_rels/workbook.xml.rels': ExcelTool.workbookRels(sheets.length),
      'xl/styles.xml': ExcelTool.styles(),
      'xl/worksheets/sheet1.xml': ExcelTool.tableSheet(model.table),
    };

    for (let i = 0; i < model.charts.length; i++) {
      let chart = model.charts[i];
      let index = i + 1;
      let sheetIndex = i + 2;
      result[`xl/worksheets/sheet${sheetIndex}.xml`] = ExcelTool.chartSheet();
      result[`xl/worksheets/_rels/sheet${sheetIndex}.xml.rels`] =
        ExcelTool.sheetRels(index);
      result[`xl/drawings/drawing${index}.xml`] = ExcelTool.drawing();
      result[`xl/drawings/_rels/drawing${index}.xml.rels`] =
        ExcelTool.drawingRels(index);
      result[`xl/charts/chart${index}.xml`] = ExcelTool.chart(model.table, chart);
    }

    return result;
  }

  // ------------------------------------------------------------------ 部件

  private static contentTypes(sheetCount: number, chartCount: number) {
    let sheets = '';
    for (let i = 1; i <= sheetCount; i++) {
      sheets += `<Override PartName="/xl/worksheets/sheet${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`;
    }
    let charts = '';
    let drawings = '';
    for (let i = 1; i <= chartCount; i++) {
      charts += `<Override PartName="/xl/charts/chart${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/>`;
      drawings += `<Override PartName="/xl/drawings/drawing${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>`;
    }
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  ${sheets}
  ${charts}
  ${drawings}
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
  }

  private static rootRels() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
  }

  private static core(title: string) {
    let now = new Date().toISOString();
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${ExcelTool.escape(title)}</dc:title>
  <dc:creator>HW-IAS-AI</dc:creator>
  <cp:lastModifiedBy>HW-IAS-AI</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>`;
  }

  private static app() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>HW-IAS-AI</Application>
</Properties>`;
  }

  private static workbook(sheets: string[]) {
    let items = sheets
      .map(
        (name, i) =>
          `<sheet name="${ExcelTool.escape(name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`
      )
      .join('');
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>${items}</sheets>
</workbook>`;
  }

  private static workbookRels(sheetCount: number) {
    let items = '';
    for (let i = 1; i <= sheetCount; i++) {
      items += `<Relationship Id="rId${i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i}.xml"/>`;
    }
    items += `<Relationship Id="rId${sheetCount + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>`;
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${items}</Relationships>`;
  }

  private static styles() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3">
    <font><sz val="11"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/></font>
    <font><b/><sz val="14"/><name val="Calibri"/></font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE8EEF7"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color rgb="FFD9D9D9"/></left>
      <right style="thin"><color rgb="FFD9D9D9"/></right>
      <top style="thin"><color rgb="FFD9D9D9"/></top>
      <bottom style="thin"><color rgb="FFD9D9D9"/></bottom>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="4">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"/>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  }

  private static tableSheet(table: IExcelTable) {
    let rows = '';
    let merge = '';
    let headerRow = 1;

    if (table.title) {
      headerRow = 2;
      merge = `<mergeCells count="1"><mergeCell ref="A1:${ExcelTool.col(table.columns.length - 1)}1"/></mergeCells>`;
      rows += `<row r="1" ht="26">${ExcelTool.titleCell(table.title)}</row>`;
    }

    let header = `<row r="${headerRow}">`;
    for (let i = 0; i < table.columns.length; i++) {
      header += ExcelTool.cell(headerRow, i, table.columns[i], 1);
    }
    header += `</row>`;
    rows += header;

    let dataStart = headerRow + 1;
    for (let i = 0; i < table.rows.length; i++) {
      let data = table.rows[i];
      let row = `<row r="${dataStart + i}">`;
      for (let j = 0; j < data.length; j++) {
        row += ExcelTool.cell(dataStart + i, j, data[j], 2);
      }
      row += `</row>`;
      rows += row;
    }

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetData>${rows}</sheetData>
  ${merge}
</worksheet>`;
  }

  private static chartSheet() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetData/>
  <drawing r:id="rId1"/>
</worksheet>`;
  }

  private static sheetRels(drawingIndex: number) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing${drawingIndex}.xml"/>
</Relationships>`;
  }

  private static drawing() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
  <xdr:twoCellAnchor>
    <xdr:from>
      <xdr:col>0</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>0</xdr:row><xdr:rowOff>0</xdr:rowOff>
    </xdr:from>
    <xdr:to>
      <xdr:col>13</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>24</xdr:row><xdr:rowOff>0</xdr:rowOff>
    </xdr:to>
    <xdr:graphicFrame macro="">
      <xdr:nvGraphicFramePr>
        <xdr:cNvPr id="2" name="Chart"/>
        <xdr:cNvGraphicFramePr/>
      </xdr:nvGraphicFramePr>
      <xdr:xfrm>
        <a:off x="0" y="0"/>
        <a:ext cx="0" cy="0"/>
      </xdr:xfrm>
      <a:graphic>
        <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart">
          <c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId1"/>
        </a:graphicData>
      </a:graphic>
    </xdr:graphicFrame>
    <xdr:clientData/>
  </xdr:twoCellAnchor>
</xdr:wsDr>`;
  }

  private static drawingRels(chartIndex: number) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart" Target="../charts/chart${chartIndex}.xml"/>
</Relationships>`;
  }

  // ------------------------------------------------------------------ 图表

  private static chart(table: IExcelTable, chart: IExcelChart) {
    let series = chart.series
      .map((x, i) => ExcelTool.series(table, chart, x, i))
      .join('');

    let body =
      chart.type === ChartType.line
        ? ExcelTool.lineChart(series)
        : ExcelTool.barChart(series);

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <c:chart>
    <c:title>
      <c:tx><c:rich>
        <a:bodyPr/>
        <a:lstStyle/>
        <a:p><a:r><a:rPr lang="zh-CN" sz="1400" b="0"/><a:t>${ExcelTool.escape(chart.title)}</a:t></a:r></a:p>
      </c:rich></c:tx>
      <c:layout/>
      <c:overlay val="0"/>
    </c:title>
    <c:plotArea>
      <c:layout/>
      ${body}
      ${ExcelTool.catAx()}
      ${ExcelTool.valAx(chart.type)}
    </c:plotArea>
    <c:legend>
      <c:legendPos val="b"/>
      <c:layout/>
      <c:overlay val="0"/>
    </c:legend>
    <c:plotVisOnly val="1"/>
    <c:dispBlanksAs val="gap"/>
  </c:chart>
</c:chartSpace>`;
  }

  private static barChart(series: string) {
    return `<c:barChart>
  <c:barDir val="col"/>
  <c:grouping val="clustered"/>
  <c:varyColors val="0"/>
  ${series}
  <c:axId val="100"/>
  <c:axId val="200"/>
</c:barChart>`;
  }

  private static lineChart(series: string) {
    return `<c:lineChart>
  <c:grouping val="standard"/>
  <c:varyColors val="0"/>
  ${series}
  <c:axId val="100"/>
  <c:axId val="200"/>
</c:lineChart>`;
  }

  private static series(
    table: IExcelTable,
    chart: IExcelChart,
    series: IExcelChart['series'][number],
    index: number
  ) {
    let start = ExcelTool.dataStartRow(table);
    let end = start + table.rows.length - 1;
    let cat = ExcelTool.range(table.name, chart.category, start, end);
    let val = ExcelTool.range(table.name, series.column, start, end);
    let color = ExcelTool.hex(series.color);

    if (chart.type === ChartType.line) {
      return `<c:ser>
    <c:idx val="${index}"/>
    <c:order val="${index}"/>
    <c:tx><c:v>${ExcelTool.escape(series.name)}</c:v></c:tx>
    <c:spPr><a:ln w="19050" cap="rnd"><a:solidFill><a:srgbClr val="${color}"/></a:solidFill></a:ln></c:spPr>
    <c:marker><c:symbol val="none"/></c:marker>
    <c:cat><c:strRef><c:f>${cat}</c:f></c:strRef></c:cat>
    <c:val><c:numRef><c:f>${val}</c:f></c:numRef></c:val>
    <c:smooth val="0"/>
  </c:ser>`;
    }

    return `<c:ser>
    <c:idx val="${index}"/>
    <c:order val="${index}"/>
    <c:tx><c:v>${ExcelTool.escape(series.name)}</c:v></c:tx>
    <c:spPr><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:ln><a:noFill/></a:ln></c:spPr>
    <c:cat><c:strRef><c:f>${cat}</c:f></c:strRef></c:cat>
    <c:val><c:numRef><c:f>${val}</c:f></c:numRef></c:val>
  </c:ser>`;
  }

  private static catAx() {
    return `<c:catAx>
    <c:axId val="100"/>
    <c:scaling><c:orientation val="minMax"/></c:scaling>
    <c:delete val="0"/>
    <c:axPos val="b"/>
    <c:majorTickMark val="none"/>
    <c:minorTickMark val="none"/>
    <c:tickLblPos val="nextTo"/>
    <c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="900"/></a:pPr><a:endParaRPr lang="zh-CN"/></a:p></c:txPr>
    <c:crossAx val="200"/>
    <c:crosses val="autoZero"/>
    <c:auto val="1"/>
    <c:lblAlgn val="ctr"/>
    <c:lblOffset val="100"/>
  </c:catAx>`;
  }

  private static valAx(type: ChartType) {
    let crossBetween =
      type === ChartType.line ? `midCat` : `between`;
    return `<c:valAx>
    <c:axId val="200"/>
    <c:scaling><c:orientation val="minMax"/></c:scaling>
    <c:delete val="0"/>
    <c:axPos val="l"/>
    <c:majorGridlines/>
    <c:numFmt formatCode="General" sourceLinked="1"/>
    <c:majorTickMark val="none"/>
    <c:minorTickMark val="none"/>
    <c:tickLblPos val="nextTo"/>
    <c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="900"/></a:pPr><a:endParaRPr lang="zh-CN"/></a:p></c:txPr>
    <c:crossAx val="100"/>
    <c:crosses val="autoZero"/>
    <c:crossBetween val="${crossBetween}"/>
  </c:valAx>`;
  }

  // ------------------------------------------------------------------ 工具

  /** 列序号（0 开始）转列字母，如 0 -> A，25 -> Z，26 -> AA */
  private static col(index: number) {
    let result = '';
    let n = index + 1;
    while (n > 0) {
      let rem = (n - 1) % 26;
      result = String.fromCharCode(65 + rem) + result;
      n = Math.floor((n - 1) / 26);
    }
    return result;
  }

  private static cell(
    rowIndex: number,
    columnIndex: number,
    value: string | number,
    style: number
  ) {
    let ref = `${ExcelTool.col(columnIndex)}${rowIndex}`;
    if (typeof value === 'number') {
      return `<c r="${ref}" s="${style}"><v>${ExcelTool.num(value)}</v></c>`;
    }
    return `<c r="${ref}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${ExcelTool.escape(String(value))}</t></is></c>`;
  }

  /** 数据行起始行号（有标题时数据从第 3 行开始，否则第 2 行） */
  private static dataStartRow(table: IExcelTable) {
    return table.title ? 3 : 2;
  }

  /** 标题单元格（跨列合并，居中对齐） */
  private static titleCell(title: string) {
    return `<c r="A1" s="3" t="inlineStr"><is><t xml:space="preserve">${ExcelTool.escape(title)}</t></is></c>`;
  }

  private static range(
    sheetName: string,
    columnIndex: number,
    startRow: number,
    endRow: number
  ) {
    let col = ExcelTool.col(columnIndex);
    return `'${sheetName}'!$${col}$${startRow}:$${col}$${endRow}`;
  }

  /** 数字转字符串，去掉浮点噪声 */
  private static num(value: number) {
    return String(Math.round(value * 10000) / 10000);
  }

  /** 颜色统一转为 ARGB 的 RGB 部分（6 位十六进制） */
  private static hex(color?: string) {
    let fallback = '00F6FF';
    if (!color) return fallback;
    let match = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (match) {
      let toHex = (n: string) =>
        parseInt(n, 10).toString(16).padStart(2, '0');
      return (toHex(match[1]) + toHex(match[2]) + toHex(match[3])).toUpperCase();
    }
    if (color.startsWith('#')) return color.substring(1).toUpperCase();
    return color.toUpperCase();
  }

  private static escape(value: string) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
