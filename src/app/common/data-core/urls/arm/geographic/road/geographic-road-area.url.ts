import { AbstractUrl } from '../../../abstract.url';

/**
 * 协议 2.3.11 里这两条 URI 写错了，以小节标题为准，别照抄协议表格里那一行：
 * - 2.3.11.1 标题是 Geographic/RoadAreas/Capability，URI 行却写成 RoadSections/Capability。
 * - 2.3.11.4 标题是 Geographic/RoadAreas/List，URI 行却写成 RoadAreas/<ID>（那是 item）。
 */
export class GeographicRoadAreaUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/RoadAreas`);
  }

  capability() {
    return `${this.basic()}/Capability`;
  }
}
