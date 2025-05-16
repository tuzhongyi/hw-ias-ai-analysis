export class SystemEventRecordDetailsOperation {
  private _misinform: boolean = false;
  private _delete: boolean = false;
  private _suspension: boolean = false;
  private _decoration: boolean = false;

  public get misinform(): boolean {
    return this._misinform;
  }
  public set misinform(v: boolean) {
    this._misinform = v;
    if (v) {
      this._delete = false;
      this._suspension = false;
      this._decoration = false;
    }
  }

  public get delete(): boolean {
    return this._delete;
  }
  public set delete(v: boolean) {
    this._delete = v;
    if (v) {
      this._misinform = false;
      this._suspension = false;
      this._decoration = false;
    }
  }

  public get suspension(): boolean {
    return this._suspension;
  }
  public set suspension(v: boolean) {
    this._suspension = v;
    if (v) {
      this._misinform = false;
      this._delete = false;
      this._decoration = false;
    }
  }

  public get decoration(): boolean {
    return this._decoration;
  }
  public set decoration(v: boolean) {
    this._decoration = v;
    if (v) {
      this._misinform = false;
      this._delete = false;
      this._suspension = false;
    }
  }
}
