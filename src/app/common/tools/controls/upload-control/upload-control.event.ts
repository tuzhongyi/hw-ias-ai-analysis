import {
  UploadControlFile,
  UploadControlFileInfo,
} from './upload-control.model'

export interface UploadControlEventArgs {
  upload(args: UploadControlFile): void
  loadstart(args: UploadControlFileInfo): void
}
