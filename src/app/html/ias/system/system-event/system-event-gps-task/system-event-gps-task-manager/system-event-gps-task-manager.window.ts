import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { PicturePolygonArgs } from '../../../../share/picture/picture-polygon/picture-polygon.model';

export class SystemEventGpsTaskManagerWindow {
  picture = new PictureWindow();
  video = new VideoWindow();
  details = new DetailsWindow();

  get opened() {
    return this.details.show;
  }
}

class PictureWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };

  title = '';
  page?: Page;
  args?: PicturePolygonArgs;

  clear() {
    this.title = '';
    this.args = undefined;
  }

  set(data: GpsTaskSampleRecord, page: Page): void {
    this.clear();
    this.page = page;
    if (data instanceof GpsTaskSampleRecord) {
      this.from.record(data, page.PageIndex - 1);
    }
  }

  private from = {
    record: (data: GpsTaskSampleRecord, index: number) => {
      let images = [...(data.Images ?? []), ...(data.SceneMatchImages ?? [])];
      if (images && images.length > 0) {
        let image = images[index];
        this.args = new PicturePolygonArgs();
        this.args.id = image.ImageUrl;
        if (image.Labels && image.Labels.length > 0) {
          let label = image.Labels[0];
          this.args.polygon = label.Polygon;
        } else {
          this.args.polygon = [];
        }
        let name = '';
        switch (index) {
          case 0:
            name = '场景照片';
            break;
          case 1:
            name = '匹配结果';
            break;

          default:
            break;
        }
        this.title = `${data.SceneName}-${name}`;
      }
    },
  };
}

class VideoWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  src?: string;
}
class DetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  data?: GpsTaskSampleRecord;
}
