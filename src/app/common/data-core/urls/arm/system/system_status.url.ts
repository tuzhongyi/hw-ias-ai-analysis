export class SystemStatusUrl {
  constructor(private base: string) {}
  upgrade() {
    return `${this.base}/UpgradeStatus`
  }
  running() {
    return `${this.base}/RunningStatus`
  }
}
