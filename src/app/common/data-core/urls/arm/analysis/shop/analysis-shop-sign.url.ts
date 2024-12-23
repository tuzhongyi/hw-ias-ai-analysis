import { AbstractUrl } from '../../../abstract.url'

export class AnalysisShopSignUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Signs`)
  }
}
