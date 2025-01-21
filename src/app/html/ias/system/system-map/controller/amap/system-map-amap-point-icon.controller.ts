export class SystemAMapPointIconController {
  private icon() {
    return '/assets/image/map/marker-blue.png';
  }

  private size() {
    let width = 53;
    let height = 68;
    let ratio = 2;
    return [width / ratio, height / ratio];
  }

  private get opts() {
    let icon = {
      type: 'image',
      image: this.icon(),
      size: this.size(),
      anchor: 'bottom-center',
    };
    return icon;
  }

  get hover() {
    return this.opts;
  }

  get normal() {
    let icon = this.opts;
    icon.image = '/assets/image/map/point.png';
    icon.size = [24, 24];
    return icon;
  }

  get selected() {
    let icon = this.opts;
    icon.image = '/assets/image/map/marker-red.png';
    return icon;
  }
}
