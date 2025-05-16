import { Injectable } from '@angular/core';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';

@Injectable()
export class SystemEventRecordDetailsSource {
  constructor(private language: LanguageTool) {}

  type(type: number) {
    return this.language.event.EventType(type);
  }
}
