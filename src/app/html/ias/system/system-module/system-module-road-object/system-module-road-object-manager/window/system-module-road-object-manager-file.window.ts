import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { OptionMode } from '../../../../../../../common/data-core/enums/option.enum';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';

export class SystemModuleRoadObjectManagerFileWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.max,
  };

  title = '视频文件';

  folder?: FileInfo;
  next = new EventEmitter<FileInfo>(true);
  mode = OptionMode.create;

  open(mode: OptionMode) {
    this.mode = mode;
    this.show = true;
  }

  on = {
    next: (data: FileInfo) => {
      this.that.window.video.show = false;
      this.next.emit(data);
    },
  };
}
