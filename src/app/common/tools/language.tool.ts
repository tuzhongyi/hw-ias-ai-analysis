import { Injectable } from '@angular/core';
import { ProcessState } from '../data-core/enums/process-state.enum';
import { Manager } from '../data-core/requests/managers/manager';
import { Language } from './language';

@Injectable({
  providedIn: 'root',
})
export class LanguageTool {
  constructor(private manager: Manager) {}

  async ProcessState(value?: ProcessState): Promise<string> {
    return new Promise<string>((resolve) => {
      this.manager.capability.device
        .then((capability) => {
          if (capability.ProcessStates) {
            let _enum = capability.ProcessStates.find((x) => x.Value == value);
            if (_enum) {
              resolve(_enum.Name);
              return;
            }
          }
          resolve(Language.ProcessState(value));
        })
        .catch((x) => {
          resolve(Language.ProcessState(value));
        });
    });
  }

  async PriorityTypes(value?: string, def: string = ''): Promise<string> {
    return new Promise<string>((resolve) => {
      this.manager.capability.security
        .then((capability) => {
          if (capability.PriorityTypes) {
            let _enum = capability.PriorityTypes.find((x) => x.Value == value);
            if (_enum) {
              resolve(_enum.Name);
              return;
            }
          }
          resolve(value ?? def);
        })
        .catch((x) => {
          resolve(value ?? def);
        });
    });
  }

  async TaskType(value?: number, def: string = ''): Promise<string> {
    return new Promise<string>((resolve) => {
      this.manager.capability.analysis
        .then((capability) => {
          if (capability.TaskTypes) {
            let _enum = capability.TaskTypes.find(
              (x) => x.Value.toString() == value?.toString()
            );
            if (_enum) {
              resolve(_enum.Name);
              return;
            }
          }
          resolve(value?.toString() ?? def);
        })
        .catch((x) => {
          resolve(value?.toString() ?? def);
        });
    });
  }
  async TaskState(value?: number, def: string = ''): Promise<string> {
    return new Promise<string>((resolve) => {
      this.manager.capability.analysis
        .then((capability) => {
          if (capability.TaskStates) {
            let _enum = capability.TaskStates.find(
              (x) => x.Value == value?.toString()
            );
            if (_enum) {
              resolve(_enum.Name);
              return;
            }
          }
          resolve(value?.toString() ?? def);
        })
        .catch((x) => {
          resolve(value?.toString() ?? def);
        });
    });
  }
}
