import { AbstractUrl } from '../../../abstract.url'

export class AnalysisServerTaskResultUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Results`)
  }
}
