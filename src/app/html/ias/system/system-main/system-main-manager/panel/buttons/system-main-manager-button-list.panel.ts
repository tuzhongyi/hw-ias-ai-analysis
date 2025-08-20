import { SystemMainManagerPanel } from '../system-main-manager.panel';

export class SystemMainManagerPanelButtonList {
  constructor(private panel: SystemMainManagerPanel) {}
  private _clicked: boolean = false;
  public get clicked(): boolean {
    return this._clicked;
  }
  public set clicked(v: boolean) {
    if (this._clicked === v) return;
    this._clicked = v;
    this.panel.list.show = this._clicked;
  }
}
