import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';

export class SystemModuleRoadObjectManagerVideoWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.video.path,
  };

  title = '视频播放';
  data?: FileInfo;
  load = new EventEmitter<void>();

  open(data: FileInfo) {
    this.title = data.FileName;
    this.data = data;
    this.show = true;
  }
}
