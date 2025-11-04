export class SystemTaskCreationFileModel {
  filename: string = '';
  size: number = 0;
  loaded = false;
  equals(data: SystemTaskCreationFileModel) {
    return data.filename == this.filename && data.size == this.size;
  }
}
