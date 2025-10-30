import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { PicturePolygonArgs } from '../../../../share/picture/picture-polygon/picture-polygon.model';

export class SystemEventGpsTaskManagerWindow {
  picture = new PictureWindow();
  video = new VideoWindow();
  details = new DetailsWindow();
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
        this.title = data.SceneName || 'GPS任务样本图片';
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
    width: '70%',
    height: '90%',
  };
  title = '';
  data?: GpsTaskSampleRecord;
}
