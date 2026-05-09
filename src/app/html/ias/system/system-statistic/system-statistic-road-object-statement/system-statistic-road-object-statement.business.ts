import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DeviceStatement } from '../../../../../common/data-core/models/arm/mobile-device/device-statement.model';
import { ArmGeographicRequestService } from '../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectReportParams } from '../../../../../common/data-core/requests/services/geographic/road/road-object/geographic-road-object.params';
import { GetDeviceStatementParams } from '../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../common/data-core/requests/services/system/system.service';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { Language } from '../../../../../common/tools/language-tool/language';

@Injectable()
export class SystemStatisticRoadObjectStatementBusiness {
  constructor(
    geo: ArmGeographicRequestService,
    system: ArmSystemRequestService
  ) {
    this.service = { geo, system };
  }

  private service: {
    geo: ArmGeographicRequestService;
    system: ArmSystemRequestService;
  };

  object(date: Date) {
    let duration = DateTimeTool.all.month(date);
    let params = new GetRoadObjectReportParams();
    params.BeginDate = duration.begin;
    params.EndDate = duration.end;
    params.StatementType = 2;
    return this.service.geo.road.object.statements(params);
  }
  device(deviceIds: string[], date: Date) {
    let all = deviceIds.map((x) => this.data.device(x, date));
    return Promise.all(all);
  }

  export = {
    save: async (element: HTMLElement, date: Date) => {
      // 🔥 横向 A4，无 padding
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pageWidth = 297;
      const pageHeight = 210;

      // ==========================================
      // 一页一页添加到 PDF
      // ==========================================

      for (let i = 0; i < element.children.length; i++) {
        let child = element.children[i] as HTMLDivElement;
        if (i > 0) {
          pdf.addPage();
        }
        await this.export.addPageToPdf(pdf, child, pageWidth, pageHeight);
      }

      pdf.save(
        `${formatDate(date, Language.YearMonth, 'en')}道路部件月报表.pdf`
      );
    },
    addPageToPdf: async (
      pdf: jsPDF,
      dom: HTMLDivElement,
      width: number,
      height: number
    ) => {
      const canvas = await html2canvas(dom, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    },
  };

  private data = {
    device: async (deviceId: string, date: Date) => {
      let duration = DateTimeTool.all.month(date);
      try {
        let params = new GetDeviceStatementParams();
        params.BeginDate = duration.begin;
        params.EndDate = duration.end;
        params.DeviceId = deviceId;
        params.StatementType = 2;
        return await this.service.system.mobile.device.statements(params);
      } catch (error) {
        let device = await this.data.get(deviceId);
        let data = new DeviceStatement();
        data.BeginDate = duration.begin;
        data.EndDate = duration.end;
        data.AttendanceNumber = 0;
        data.StatementType = 2;
        data.DeviceId = deviceId;
        data.DeviceName = device.Name;

        if (device.DivisionId) {
          data.DivisonId = device.DivisionId;
        }

        return data;
      }
    },
    get: (deviceId: string) => {
      return this.service.system.mobile.device.cache.get(deviceId);
    },
  };
}
