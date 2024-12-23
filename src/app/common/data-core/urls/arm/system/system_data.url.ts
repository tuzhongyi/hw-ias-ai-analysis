export class SystemDataUrl {
  constructor(private base: string) {}
  log(filename: string) {
    return `${this.base}/LogData/${filename}`
  }
  configuration() {
    return `${this.base}/ConfigurationData`
  }
}
