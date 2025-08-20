import { EventEmitter } from '@angular/core';
import { ILocation } from '../../../../../../../common/data-core/models/model.interface';
import { IASMapAMapConfig } from '../ias-map-amap.config';
import { IASMapAMapConverter } from '../ias-map-amap.converter';

export abstract class IASMapAMapPointAbstract {
  event = {
    move: new EventEmitter<ILocation | undefined>(),
  };
  protected abstract style: {
    radius: number;
    unit: string;
    color: string;
    borderWidth: number;
    blurWidth: number;
  };
  constructor(
    private container: Loca.Container,
    zooms: [number, number] = IASMapAMapConfig.point.zooms
  ) {
    this.layer = this.init(zooms);
  }
  private converter = new IASMapAMapConverter();
  private layer: Loca.PointLayer;
  private over?: ILocation;

  private init(zooms?: [number, number]) {
    let layer = new Loca.PointLayer({
      blend: 'normal',
      zooms: zooms,
    });
    return layer;
  }

  load(datas: ILocation[], opts?: { zooms?: [number, number] }) {
    if (opts) {
      if (opts.zooms) {
        this.layer.setZooms(opts.zooms);
      }
    }
    let geo = this.converter.geo.point(datas);
    this.layer.setSource(geo);
    this.layer.setStyle(this.style);
    this.container.add(this.layer);
  }

  clear() {
    this.layer.remove();
  }

  moving(position: [number, number]) {
    let point = this.layer.queryFeature(position);
    if (point) {
      this.over = point.properties as ILocation;
      this.event.move.emit(this.over);
    } else {
      if (this.over) {
        this.over = undefined;
        this.event.move.emit();
      }
    }
  }
}
