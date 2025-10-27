import { IIdNameLocationModel } from '../../../../../../../common/data-core/models/model.interface';
import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { IASMapAMapMarkerEvent } from './ias-map-amap-marker.model';

export abstract class IASMapAMapMarkerAbstract<T extends IIdNameLocationModel> {
  event = new IASMapAMapMarkerEvent<T>();
  marker: AMap.Marker;
  selected = false;
  data: T;

  constructor(data: T) {
    this.icon = {
      normal: this.defaulticon,
    };
    this.marker = this.create(data);
    this.data = data;
  }

  protected icon: {
    normal: AMap.Icon;
    hover?: AMap.Icon;
    selected?: AMap.Icon;
  };

  private get defaulticon() {
    let icon = new AMap.Icon({
      size: [SizeTool.map.shop.width, SizeTool.map.shop.width],
      image: PathTool.image.map.shop.white.normal,
      imageSize: [SizeTool.map.shop.width, SizeTool.map.shop.width],
    });
    return icon;
  }

  protected create(data: IIdNameLocationModel) {
    if (data.Location) {
      let position: [number, number] = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
      let marker = new AMap.Marker({
        icon: this.icon.normal,
        position: [...position],
        title: data.Name,
      });
      this.regist(marker);
      return marker;
    }
    throw new Error('Location is not defined');
  }

  private regist(marker: AMap.Marker) {
    marker.on('mouseover', (e: any) => {
      this.hover();
      this.event.mouseover.emit(this.data);
    });
    marker.on('mouseout', (e: any) => {
      this.out();
      this.event.mouseout.emit(this.data);
    });
    marker.on('click', (e: any) => {
      this.event.click.emit(this.data);
    });
    marker.on('dblclick', (e: any) => {
      this.event.dblclick.emit(this.data);
    });
  }

  async hover() {
    if (this.selected) return;

    if (this.icon.hover) {
      this.marker.setIcon(this.icon.hover);
    }
    this.marker.setzIndex(2);
  }
  async out() {
    if (this.selected) return;
    this.marker.setIcon(this.icon.normal);
    this.marker.setzIndex(1);
  }
  async select() {
    if (this.selected) return;
    this.selected = true;

    if (this.icon.selected) {
      this.marker.setIcon(this.icon.selected);
    }
    this.marker.setzIndex(3);
  }
  async blur() {
    if (!this.selected) return;
    this.selected = false;

    this.marker.setIcon(this.icon.normal);
    this.marker.setzIndex(1);
  }
}
