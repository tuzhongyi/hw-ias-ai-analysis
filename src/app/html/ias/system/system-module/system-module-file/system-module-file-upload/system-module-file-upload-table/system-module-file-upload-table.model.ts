export class SystemModuleFile {
  filename: string = '';
  size: number = 0;
  loaded = false;
  equals(data: SystemModuleFile) {
    return data.filename == this.filename && data.size == this.size;
  }
}
