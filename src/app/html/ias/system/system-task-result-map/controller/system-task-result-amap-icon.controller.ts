export class SystemTaskResultAMapIconController {
  constructor() {}

  create1(selected = false) {
    let src = this.icon(selected);
    let width = 53;
    let height = 68;
    let icon: AMap.Icon;
    let ratio = 2;
    if (!selected) {
      ratio = 6;
    }
    let opts: AMap.IconOpts = {
      size: [width / ratio, height / ratio],
      image: src,
      imageSize: [width / ratio, height / ratio],
      // imageOffset: [-width / ratio / 2, -height / ratio],
      anchor: 'bottom-center',
    };
    icon = new AMap.Icon(opts);

    return icon;
  }
  private icon(selected = false) {
    if (selected) {
      return '/assets/image/map/marker-red.png';
    }
    return '/assets/image/map/marker-blue.png';
  }
  private size(selected = false): [number, number] {
    let width = 53;
    let height = 68;
    let ratio = 6;
    if (selected) {
      ratio = 2;
    }
    return [width / ratio, height / ratio];
  }
  create(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: this.icon(false),
      size: this.size(false),
      anchor: 'bottom-center',
    };
    return icon;
  }

  get(selected = false) {
    return {
      image: this.icon(selected),
      size: this.size(selected),
    };
  }
}
