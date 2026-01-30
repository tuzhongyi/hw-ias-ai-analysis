import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemMobuleFileManagerWindow {
  details = new DetailsWindow();
  upload = new UploadWindow();
  progress = new ProgressWindow();
}
class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.video.path,
  };
  data?: FileInfo;
}
class UploadWindow extends WindowViewModel {
  style = {
    width: '40%',
    height: '70%',
  };
  title = '上传视频';

  open() {
    this.show = true;
  }
}
class ProgressWindow extends WindowViewModel {
  style = {
    width: '30%',
    height: '25%',
  };
  title = '上传进度';

  files: UploadControlFile[] = [];

  open(files: UploadControlFile[]) {
    this.files = files;
    this.show = true;
  }
}
