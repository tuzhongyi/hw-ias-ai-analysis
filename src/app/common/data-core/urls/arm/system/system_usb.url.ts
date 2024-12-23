export class SystemUsbUrl {
  constructor(private base: string) {}
  device() {
    return `${this.base}/UsbDevices`
  }
}
