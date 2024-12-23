import { AbstractUrl } from '../../../abstract.url'
import { AnalysisServerTaskUrl } from './analysis-server-task.url'

export class AnalysisServerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}Servers`)
  }

  get task() {
    return new AnalysisServerTaskUrl(this.basic())
  }

  capability() {
    return `${this.basic()}/Capability`
  }
}
