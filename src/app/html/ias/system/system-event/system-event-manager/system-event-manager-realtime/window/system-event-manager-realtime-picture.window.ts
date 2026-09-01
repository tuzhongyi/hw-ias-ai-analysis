import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { ShopSign } from '../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Assignment } from '../../../../../../../common/data-core/models/arm/event/assignment.model';
import { EventResourceContent } from '../../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { NameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Page } from '../../../../../../../common/data-core/models/interface/page-list.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { PicturePolygonArgs } from '../../../../../share/picture/picture-polygon/picture-polygon.model';

export class SystemEventManagerRealtimePictureWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };

  title = '';
  page?: Page;
  args?: PicturePolygonArgs;

  footnotes: string[] = [];

  clear() {
    this.title = '';
    this.args = undefined;
    this.footnotes = [];
  }

  set(
    data:
      | MobileEventRecord
      | ShopRegistration
      | ShopSign
      | EventResourceContent
      | Assignment
      | NameValue,
    index: number,
  ): void {
    this.clear();
    if (data instanceof MobileEventRecord) {
      this.from.record(data, index);
    } else if (data instanceof EventResourceContent) {
      return this.from.resource(data);
    } else if (data instanceof Assignment) {
      return this.from.assignment(data, index);
    } else if (data instanceof NameValue) {
      return this.from.namevalue(data);
    }
  }

  private from = {
    namevalue: (data: NameValue) => {
      this.args = new PicturePolygonArgs();
      this.title = data.Name;
      this.args.src = data.Value;

      this.args.polygon = [];
    },
    record: (data: MobileEventRecord, index: number) => {
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[index];
        if (data.Address) {
          this.footnotes.push(data.Address);
        }
        if (data.Confidence != undefined) {
          this.footnotes.push(`${Math.round(data.Confidence * 100) / 100}%`);
        }
        return this.from.resource(resource);
      }
    },
    resource: (data: EventResourceContent) => {
      this.args = new PicturePolygonArgs();
      this.title = data.ResourceName;

      this.args.id = data.ImageUrl;
      this.args.polygon = [];
      if (data.Objects && data.Objects.length > 0) {
        this.args.polygon = data.Objects[0].Polygon;
      }
    },
    assignment: (data: Assignment, index: number) => {
      this.title = '处置结果';
      if (data.HandledImageUrls) {
        this.args = new PicturePolygonArgs();
        this.args.id = data.HandledImageUrls[index];
        this.args.polygon = [];
      }
    },
  };
}
