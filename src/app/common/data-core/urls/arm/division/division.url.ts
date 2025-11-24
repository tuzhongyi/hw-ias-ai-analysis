import { BaseUrl } from '../../base.url';

export class ArmDivisionUrl {
  static basic() {
    return `${BaseUrl.arm}/Divisions`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static excel() {
    return `${this.basic()}/Excels`;
  }
}
