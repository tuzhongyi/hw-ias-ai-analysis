import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemTaskRoadObjectManagerComponent } from '../system-task-road-object-manager.component';

export class SystemTaskRoadObjectManagerFileWindow extends WindowViewModel {
  constructor(private that: SystemTaskRoadObjectManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.max,
  };

  title = '视频文件';

  folder?: FileInfo;
  next = new EventEmitter<FileInfo>(true);

  open() {
    this.show = true;
  }

  on = {
    next: (data: FileInfo) => {
      this.that.window.video.show = false;
      this.next.emit(data);
    },
  };
}
