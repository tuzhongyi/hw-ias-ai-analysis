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

  create() {
    let icon = {
      type: 'image',
      image: this.icon(),
      size: this.size(),
      anchor: 'bottom-center',
    };
    return icon;
  }
}
