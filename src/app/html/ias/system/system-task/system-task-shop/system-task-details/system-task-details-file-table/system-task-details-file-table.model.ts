export class SystemTaskDetailsFileModel {
  filename: string = '';
  size?: number;
  loaded?: boolean;
  progress = 0;
  equals(data: SystemTaskDetailsFileModel) {
    return data.filename == this.filename;
  }
}
