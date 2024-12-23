export class SystemConfigUrl {
  constructor(private base: string) {}
  package() {
    return `${this.base}/PackageConfig`
  }
}
