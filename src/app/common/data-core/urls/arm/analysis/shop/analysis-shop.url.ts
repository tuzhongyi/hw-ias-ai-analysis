import { AbstractUrl } from '../../../abstract.url'
import { AnalysisShopSignUrl } from './analysis-shop-sign.url'

export class AnalysisShopUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Shops`)
  }

  sign(id?: string) {
    if (id) {
      return new AnalysisShopSignUrl(`${this.item(id)}`)
    }
    return new AnalysisShopSignUrl(this.basic())
  }
}
